# SkillLens Backend

FastAPI service that powers real GitHub skill analysis, resume text extraction, and commit-backed skill detection.

## What it does

- Fetches GitHub user profiles and public repositories
- Analyzes the latest 30 commits per repository
- Derives skills from repository metadata and commit messages
- Sends GitHub context into the LLM for resume skill extraction
- Supports resume file upload and text extraction via the API
- Returns only real, API-driven analysis data

## Run locally

1. Create a virtual environment.
2. Install dependencies from `requirements.txt`.
3. Copy `.env.example` to `.env` and fill the secrets.
4. Start the API:

```bash
uvicorn app.main:app --reload --app-dir backend
```

## Environment

- `GROQ_API_KEY` enables resume skill extraction.
- `GITHUB_TOKEN` is optional, but helps avoid GitHub API rate limits.
- `FRONTEND_ORIGINS` must include the frontend origin for browser requests.

## API

- `GET /api/analyze?username=<github-user>`: fetch and score public GitHub repositories with commit evidence.
- `POST /api/resume`: extract skills from raw resume text.
- `POST /api/upload`: extract text from `.pdf`, `.docx`, `.pptx`, `.txt`, or `.md` files.
- `GET /health`: lightweight health probe.