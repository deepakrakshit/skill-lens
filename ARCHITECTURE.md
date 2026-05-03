# SkillLens Architecture

## System Overview

SkillLens is a full-stack application that analyzes GitHub profiles and resumes to provide skill-based insights and career readiness metrics. It uses a decoupled backend (FastAPI) and frontend (Next.js) architecture.

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    (Next.js + React 19)                      │
│                     Port: 3000                               │
│                                                              │
│  • Homepage: GitHub username input                          │
│  • Dashboard: Live analysis results with metrics             │
│  • 3D Scene: Framer Motion + Three.js animations            │
│  • Components: Modular React with TypeScript                │
└────────────┬────────────────────────────────────────────────┘
             │
             │ HTTP (CORS-enabled)
             │
┌────────────▼────────────────────────────────────────────────┐
│                         Backend                              │
│                   (FastAPI + Uvicorn)                        │
│                     Port: 8000                               │
│                                                              │
│  ├─ GET  /health           - Server status                 │
│  ├─ GET  /analyze?username - GitHub analysis               │
│  ├─ POST /resume           - Resume parsing + skill extraction
│  └─ POST /upload           - File format conversion         │
└────────────┬────────────────────────────────────────────────┘
             │
             │ HTTP (async/await pattern)
             │
     ┌───────┴──────────┐
     │                  │
┌────▼─────┐      ┌─────▼────┐
│  GitHub  │      │   Groq   │
│   API    │      │   API    │
└──────────┘      └──────────┘
```

## Directory Structure

```
NIET/
├── backend/                          # FastAPI service
│   ├── .venv/                        # Python virtual environment
│   ├── app/
│   │   ├── __init__.py              # Package marker
│   │   ├── main.py                  # FastAPI app + CORS middleware
│   │   ├── models.py                # Pydantic request/response models
│   │   ├── api/
│   │   │   └── routes.py            # API endpoint handlers
│   │   ├── core/
│   │   │   ├── config.py            # Settings from environment
│   │   │   └── constants.py         # Skill mappings
│   │   └── services/
│   │       ├── github.py            # GitHub API client + analysis
│   │       ├── resume.py            # Resume text processing + LLM
│   │       └── upload.py            # File parsing (PDF, DOCX, etc.)
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment template
│   └── README.md                    # Setup instructions
│
└── frontend/                         # Next.js frontend
    ├── node_modules/               # npm dependencies
    ├── public/                     # Static assets
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx          # Root layout
    │   │   ├── page.tsx            # Homepage
    │   │   ├── globals.css         # Global styles
    │   │   ├── about/
    │   │   ├── dashboard/          # Main analytics dashboard
    │   │   ├── product/
    │   │   └── ...
    │   ├── components/
    │   │   ├── SkillDashboard.tsx  # Skills visualization
    │   │   ├── JobGapPanel.tsx     # Job requirements matching
    │   │   ├── RealityCheck.tsx    # Career readiness info
    │   │   ├── LoadingSkeleton.tsx # Loading state UI
    │   │   └── ...
    │   └── lib/
    │       ├── backend.ts          # API client library
    │       ├── constants.ts        # Frontend constants
    │       └── types.ts            # TypeScript types
    ├── package.json                # Dependencies + scripts
    ├── tsconfig.json               # TypeScript config
    ├── next.config.ts              # Next.js configuration
    ├── .env.local.example          # Environment template
    └── README.md                   # Frontend setup
```

## Backend Architecture

### Core Modules

**`app/main.py`**
- Initializes FastAPI application
- Configures CORS middleware for frontend origins
- Loads settings from environment
- Includes API router with `/api` prefix

**`app/models.py`**
- Defines Pydantic models for all request/response contracts
- Implements camelCase field aliasing (e.g., `repo_count` → `repoCount`)
- Includes ConfigDict(populate_by_name=True) for flexible deserialization
- Models: GitHubSkill, GitHubRepo, GitHubUser, AnalysisResult, ResumeParseResponse, UploadResponse

**`app/core/config.py`**
- Settings class with dataclass pattern
- Loads from environment variables with sensible defaults
- Supports optional GitHub token for higher API rate limits
- Configurable Groq API key and model selection
- CORS origins configured via FRONTEND_ORIGINS environment variable

**`app/core/constants.py`**
- LANGUAGE_SKILL_MAP: Maps programming languages to skill categories (40 entries)
- FRAMEWORK_KEYWORDS: Dictionary of frameworks and their search keywords (25 entries)
- Used by GitHub analysis service for skill detection

**`app/services/github.py`**
- `analyze_github_profile()`: Main analysis orchestrator
- `fetch_user()`: Async call to GitHub API user endpoint
- `fetch_all_repos()`: Paginated repository fetching (100 repos/page)
- `detect_frameworks()`: Keyword matching in repo metadata
- `get_strength()`: Maps repository count to confidence level
- `get_percentage()`: Normalizes metrics for UI visualization

**`app/services/resume.py`**
- `clean_resume_text()`: Removes control characters, normalizes whitespace
- `extract_skills_with_llm()`: Calls Groq API for intelligent skill extraction
- Validates input length (20-4000 chars)
- Returns structured JSON response with skill categories

**`app/services/upload.py`**
- `extract_text_from_upload()`: Main upload handler
- Supports: PDF (PyPDF), DOCX (python-docx), PPTX (python-pptx), TXT, MD
- Validates file extensions, reads file content
- Returns extracted text for downstream processing

**`app/api/routes.py`**
- GET `/health`: Server health check
- GET `/analyze`: GitHub profile analysis
- POST `/resume`: Resume parsing + skill extraction
- POST `/upload`: File upload + text extraction
- Error handling with appropriate HTTP status codes

### API Endpoints

#### GET /api/analyze
Query: `username` (GitHub username)
Response: AnalysisResult (skills array, totals, confidence scores)

#### POST /api/resume
Body: { "resume": "text content" }
Response: { "status": "success"|"error"|"empty", "skills": [...], "message": "..." }

#### POST /api/upload
Body: multipart/form-data with file
Response: { "success": true, "text": "extracted content", "fileName": "...", "extension": "..." }

## Frontend Architecture

### Page Structure

**Homepage (`src/app/page.tsx`)**
- Input form for GitHub username
- Demo buttons for quick testing
- Navigation to dashboard with username as query parameter

**Dashboard (`src/app/dashboard/page.tsx`)**
- Fetches analysis from backend API
- Displays live metrics:
  - Trust Score: Average confidence across detected skills
  - JD Match: Percentage match with typical job requirements
  - Placement Readiness: Based on skill count threshold
  - Evidence Count: Number of projects in portfolio
- Shows top 4 skills with confidence percentages
- Live status indicator showing backend connection state

### Component Structure

**`SkillDashboard.tsx`**
- Renders skill cards with confidence bars
- Shows skill strength level
- Displays framework/language associations

**`JobGapPanel.tsx`**
- Lists common job requirements
- Highlights matched vs. missing skills
- Suggests skill development areas

**`RealityCheck.tsx`**
- Career readiness assessment
- Placement probability calculation
- Personalized guidance based on profile

**`LoadingSkeleton.tsx`**
- Skeleton screens for better UX
- Matches final component layout

### Backend Integration

**`lib/backend.ts`**
- Singleton HTTP client via httpx
- Type-safe API wrappers
- Automatic error handling and response validation
- Uses NEXT_PUBLIC_BACKEND_URL environment variable
- Implements retry logic with exponential backoff (optional)

## Data Flow

### GitHub Analysis Flow

1. User enters GitHub username on homepage
2. Frontend navigates to `/dashboard?username=octocat`
3. Dashboard useEffect fetches from backend: GET `/api/analyze?username=octocat`
4. Backend:
   - Fetches user profile from GitHub API
   - Fetches all repositories (paginated)
   - Detects frameworks in each repo
   - Calculates strength, confidence, percentage for each skill
   - Returns AnalysisResult with array of detected skills
5. Frontend receives AnalysisResult, computes:
   - trustScore: average of skill confidences
   - jdMatch: formula based on skill count + repo count
   - placementReadiness: tier based on skill count
6. Dashboard displays live metrics and skill cards

### Resume Processing Flow

1. User uploads resume file (PDF, DOCX, etc.)
2. Frontend POST to `/api/upload` with file
3. Backend extracts text, returns raw content
4. Frontend POST extracted text to `/api/resume`
5. Backend calls Groq LLM API for skill extraction
6. Frontend receives structured skills, displays on dashboard

## Environment Configuration

### Backend (.env)
```
APP_NAME=SkillLens API
API_PREFIX=/api
GITHUB_USER_AGENT=SkillLens-Analyzer
GITHUB_TOKEN=<optional, increases rate limits>
GROQ_API_KEY=<required for resume parsing>
GROQ_MODEL=mixtral-8x7b-32768
FRONTEND_ORIGINS=http://localhost:3000,https://skilllens.vercel.app
```

### Frontend (.env.local)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Technology Stack

**Backend:**
- FastAPI 0.115+
- Uvicorn (ASGI server)
- Pydantic 2.10+ (validation + serialization)
- httpx (async HTTP client)
- PyPDF, python-docx, python-pptx (file parsing)

**Frontend:**
- Next.js 16.2.4
- React 19.2.4 (server + client components)
- TypeScript 5.6+
- Tailwind CSS 4.0+
- Framer Motion (animations)
- React Three Fiber (3D rendering)
- Lucide React (icons)

**External APIs:**
- GitHub API v3 (public repositories, no auth required)
- Groq API (LLM for skill extraction)

## Deployment Architecture

### Local Development
- Backend: `uvicorn app.main:app --reload --port 8000`
- Frontend: `npm run dev` (port 3000)
- Communication: HTTP on localhost

### Production

**Backend Deployment Options:**
- AWS Lambda (serverless)
- Heroku, Railway, Render (managed platforms)
- Docker container on EC2/Kubernetes

**Frontend Deployment:**
- Vercel (recommended for Next.js)
- Netlify
- AWS S3 + CloudFront
- Docker container

**Environment Variables in Production:**
- Backend: Set via platform secrets/environment
- Frontend: Build-time via NEXT_PUBLIC_* variables

## Scaling Considerations

### Backend
- Add caching (Redis) for GitHub API responses
- Implement request rate limiting
- Use job queue (Celery) for async resume processing
- Horizontal scaling with load balancer

### Frontend
- CDN for static assets
- Image optimization (next/image)
- Code splitting + lazy loading
- Service Worker for offline capability

## Security Measures

- CORS middleware restricts frontend origins
- Environment variables protect API keys
- Input validation via Pydantic
- No sensitive data in response bodies
- Rate limiting on backend endpoints (recommended)
- HTTPS in production

## Error Handling

**Backend:**
- ValueError → 404 Not Found
- RuntimeError → 502 Bad Gateway
- Custom HTTPException with detail messages

**Frontend:**
- Try-catch around fetch calls
- User-friendly error messages
- Graceful fallbacks in UI
- Error logging for debugging

## Testing Strategy

- Backend: pytest with async fixtures
- Frontend: Jest + React Testing Library
- Integration: E2E tests with Cypress/Playwright
- API contract testing with Pact

---

**Last Updated:** 2024
**Version:** 1.0.0
