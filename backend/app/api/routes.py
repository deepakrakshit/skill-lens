from __future__ import annotations

from fastapi import APIRouter, File, HTTPException, Query, UploadFile

from app.core.config import get_settings
from app.models import ResumeParseResponse, ResumeRequest, UploadResponse
from app.services.github import analyze_github_profile
from app.services.resume import extract_skills_with_llm
from app.services.upload import extract_text_from_upload

router = APIRouter()


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/analyze")
async def analyze(username: str = Query(..., min_length=1)) -> dict[str, object]:
    settings = get_settings()
    cleaned_username = username.strip()

    if not cleaned_username:
        raise HTTPException(status_code=400, detail="Username is required")

    try:
        analysis = await analyze_github_profile(cleaned_username, settings)
        return analysis.model_dump(by_alias=True)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except RuntimeError as error:
        raise HTTPException(status_code=502, detail=str(error)) from error


@router.post("/resume", response_model=ResumeParseResponse)
async def parse_resume(payload: ResumeRequest) -> ResumeParseResponse:
    settings = get_settings()

    if not payload.resume_text:
        return ResumeParseResponse(
            skills=[],
            message="No resume text provided",
            rawTextPreview="",
            status="empty",
        )

    cleaned = payload.resume_text.strip()
    if len(cleaned) < 20:
        return ResumeParseResponse(
            skills=[],
            message="Resume text too short to extract meaningful skills",
            rawTextPreview=cleaned,
            status="empty",
        )

    try:
        skills, message = await extract_skills_with_llm(cleaned, settings)
        return ResumeParseResponse(
            skills=skills,
            message=message,
            rawTextPreview=cleaned[:500],
            status="success" if skills else "empty",
        )
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


@router.post("/upload", response_model=UploadResponse)
async def upload_resume(file: UploadFile | None = File(default=None)) -> UploadResponse:
    if file is None:
        raise HTTPException(status_code=400, detail="No file provided")

    extracted_text, file_name, error = await extract_text_from_upload(file)
    if error:
        status_code = 400 if error.startswith("Unsupported file format") else 422
        raise HTTPException(status_code=status_code, detail=error)

    return UploadResponse(text=extracted_text, fileName=file_name, error=None)