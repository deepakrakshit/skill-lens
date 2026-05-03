from __future__ import annotations

import json
import re

import httpx

from app.core.config import Settings


def clean_resume_text(raw: str) -> str:
    cleaned = raw.replace("\r\n", "\n").replace("\r", "\n").replace("\u2022", "•")
    cleaned = re.sub(r"[^\S\n]+", " ", cleaned)
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    cleaned = re.sub(r"^[\s•\-\*○●▪▸►→]+", "• ", cleaned, flags=re.MULTILINE)
    return cleaned.strip()


async def extract_skills_with_llm(
    text: str, settings: Settings, github_context: str = ""
) -> tuple[list[str], str]:
    """
    Extract skills using LLM with optional GitHub commit history context.
    
    Args:
        text: Resume or text content to analyze
        settings: Configuration with API keys
        github_context: Optional GitHub commit history for enhanced analysis
    """
    if not settings.groq_api_key:
        raise RuntimeError("Missing GROQ_API_KEY environment variable")

    cleaned = clean_resume_text(text)
    if not cleaned or len(cleaned) < 20:
        return [], "No meaningful content provided. Returning empty skills."

    truncated = cleaned[:3500]  # Leave room for GitHub context
    
    system_prompt = (
        "You are a precise skill extraction engine with STRICT rules: "
        "extract only technical skills explicitly mentioned in the text; "
        "do not infer or guess; if no skills are found return an empty array. "
        'Return only valid JSON in the exact form {"skills": [...], "message": "..."}. '
        "Use canonical names such as React, Node.js, C++, Vue.js, and PostgreSQL. "
        "When GitHub commit history is provided, prioritize skills mentioned in actual commits over claims."
    )
    
    user_content = (
        "Extract all explicitly mentioned technical skills from this text. "
        "Do not add any skills not directly stated:\n\n"
        f"{truncated}"
    )
    
    if github_context:
        user_content += f"\n\nREAL EVIDENCE FROM COMMITS (Latest 30 commits):\n{github_context}"
    
    payload = {
        "model": settings.groq_model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ],
        "temperature": 0,
        "max_tokens": 800,
        "response_format": {"type": "json_object"},
    }

    headers = {
        "Authorization": f"Bearer {settings.groq_api_key}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(timeout=45.0) as client:
        response = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=payload,
        )

    if not response.is_success:
        raise RuntimeError(f"LLM skill extraction failed: {response.status_code}")

    content = (
        response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
    )
    if not content:
        return [], "LLM returned empty response"

    try:
        parsed = json.loads(content)
        raw_skills = parsed.get("skills", []) if isinstance(parsed, dict) else []
        skills = sorted({str(skill).strip() for skill in raw_skills if str(skill).strip()})
        message = (
            parsed.get("message", f"Extracted {len(skills)} skills")
            if isinstance(parsed, dict)
            else f"Extracted {len(skills)} skills"
        )
        return skills, message
    except json.JSONDecodeError:
        return [], "Failed to parse LLM response"