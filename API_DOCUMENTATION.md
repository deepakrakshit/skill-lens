# API Documentation

## Base URL

**Development:** `http://127.0.0.1:8000`
**Production:** (to be configured)

All requests use JSON format with `Content-Type: application/json` unless otherwise specified.

---

## Response Format

All API responses follow this structure:

```json
{
  "data": { /* endpoint-specific data */ },
  "status": "success|error",
  "message": "optional message"
}
```

Error responses include HTTP status codes and detail messages.

---

## Endpoints

### 1. Health Check

**Endpoint:** `GET /api/health`

Check if the backend server is running and responsive.

**Response:**
```json
{
  "status": "ok"
}
```

**Status Code:** `200 OK`

**Example:**
```bash
curl http://127.0.0.1:8000/api/health
```

---

### 2. GitHub Profile Analysis

**Endpoint:** `GET /api/analyze`

Analyze a GitHub user's repositories to detect skills, frameworks, and generate career metrics.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | GitHub username to analyze |

**Response Body:**
```typescript
interface AnalysisResult {
  user: GitHubUser;
  skills: GitHubSkill[];
  totalRepos: number;
  public_repos: number;
}

interface GitHubUser {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  profileUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  joinDate: string;
}

interface GitHubSkill {
  name: string;
  repoCount: number;
  strength: "Strong" | "Moderate" | "Weak";
  confidence: number;  // 0-100
  percentage: number;  // 0-100 for UI bar
  frameworks: string[];
}
```

**Status Codes:**
- `200 OK` - Analysis successful
- `400 Bad Request` - Missing/invalid username parameter
- `404 Not Found` - GitHub user not found
- `502 Bad Gateway` - GitHub API error

**Examples:**

```bash
# Analyze user 'octocat'
curl "http://127.0.0.1:8000/api/analyze?username=octocat"

# Response:
{
  "user": {
    "name": "The Octocat",
    "username": "octocat",
    "bio": "GitHub mascot",
    "avatar": "https://avatars.githubusercontent.com/u/1?v=4",
    "profileUrl": "https://github.com/octocat",
    "followers": 3938,
    "following": 9,
    "publicRepos": 2,
    "joinDate": "2008-01-25"
  },
  "skills": [
    {
      "name": "Python",
      "repoCount": 12,
      "strength": "Strong",
      "confidence": 95,
      "percentage": 100,
      "frameworks": ["Django", "FastAPI"]
    }
  ],
  "totalRepos": 45,
  "public_repos": 2
}
```

---

### 3. Resume Parsing

**Endpoint:** `POST /api/resume`

Extract and analyze skills from resume text using LLM (Groq).

**Request Body:**
```json
{
  "resume": "string (resume text content)"
}
```

**Response:**
```typescript
interface ResumeParseResponse {
  status: "success" | "error" | "empty";
  skills: ResumeSkill[];
  message: string;
  rawTextPreview: string;
}

interface ResumeSkill {
  name: string;
  category: string;
  proficiency: string;
}
```

**Status Codes:**
- `200 OK` - Parsing completed (check status field)
- `400 Bad Request` - Invalid request body
- `502 Bad Gateway` - Groq API error

**Validation Rules:**
- Resume text must be 20-4000 characters
- Requires GROQ_API_KEY environment variable
- Returns "empty" status if no skills detected

**Example:**

```bash
curl -X POST http://127.0.0.1:8000/api/resume \
  -H "Content-Type: application/json" \
  -d '{
    "resume": "Senior Python Developer with 5 years experience. Proficient in Django, FastAPI, PostgreSQL, AWS Lambda, Terraform. Led team of 3 engineers building microservices."
  }'

# Response:
{
  "status": "success",
  "skills": [
    {
      "name": "Python",
      "category": "Programming Language",
      "proficiency": "Expert"
    },
    {
      "name": "Django",
      "category": "Framework",
      "proficiency": "Advanced"
    },
    {
      "name": "AWS Lambda",
      "category": "Cloud Platform",
      "proficiency": "Advanced"
    }
  ],
  "message": "Successfully extracted 8 skills",
  "rawTextPreview": "Senior Python Developer with 5 years experience..."
}
```

---

### 4. File Upload & Conversion

**Endpoint:** `POST /api/upload`

Upload a file and extract text content. Supports multiple formats.

**Request:**
```
Content-Type: multipart/form-data
Form Field: "file" (binary)
```

**Supported Formats:**
| Format | Extension | Parser |
|--------|-----------|--------|
| PDF | `.pdf` | PyPDF |
| Word | `.docx` | python-docx |
| PowerPoint | `.pptx` | python-pptx |
| Text | `.txt` | UTF-8 decode |
| Markdown | `.md` | UTF-8 decode |

**Response:**
```typescript
interface UploadResponse {
  success: boolean;
  text: string;            // extracted text
  fileName: string;        // original filename
  extension: string;       // file extension
  error?: string;          // error message if failed
}
```

**Status Codes:**
- `200 OK` - File processed successfully
- `400 Bad Request` - Unsupported file format
- `413 Payload Too Large` - File size exceeds limit
- `502 Bad Gateway` - File parsing error

**File Size Limits:**
- Max: 50MB per file

**Example:**

```bash
# Upload a PDF resume
curl -X POST http://127.0.0.1:8000/api/upload \
  -F "file=@resume.pdf"

# Response:
{
  "success": true,
  "text": "Senior Python Developer...",
  "fileName": "resume.pdf",
  "extension": "pdf"
}

# Then send extracted text to /api/resume
curl -X POST http://127.0.0.1:8000/api/resume \
  -H "Content-Type: application/json" \
  -d '{
    "resume": "Senior Python Developer..."
  }'
```

---

## Error Handling

### Error Response Format
```json
{
  "detail": "descriptive error message",
  "status_code": 400
}
```

### Common Errors

| Error | Status | Cause | Solution |
|-------|--------|-------|----------|
| `username is required` | 400 | Missing query parameter | Add `?username=...` to URL |
| `User not found` | 404 | Invalid GitHub username | Verify username spelling |
| `GitHub API error` | 502 | GitHub API rate limit or outage | Retry later or provide GITHUB_TOKEN |
| `No module named 'groq'` | 502 | Missing dependency | Run `pip install -r requirements.txt` |
| `Invalid file type` | 400 | Unsupported file format | Use PDF, DOCX, PPTX, TXT, or MD |
| `GROQ_API_KEY not set` | 502 | Missing environment variable | Set GROQ_API_KEY environment variable |

---

## Rate Limiting

**GitHub API:**
- Public requests: 60 requests/hour (no auth)
- Authenticated: 5000 requests/hour (with token)

**Groq API:**
- Depends on account tier
- Check account at https://console.groq.com

**Recommendations:**
- Set GITHUB_TOKEN environment variable to increase GitHub rate limits
- Implement frontend caching to avoid repeated requests
- Add backend caching (Redis) for production

---

## Authentication

Currently, **all endpoints are public** (no authentication required).

Future versions may implement:
- API key authentication
- OAuth 2.0 for user-specific features
- Rate limiting per API key

---

## CORS Configuration

Backend is configured to accept requests from:
- `http://localhost:3000` (local frontend)
- Additional origins via FRONTEND_ORIGINS environment variable

Browsers enforce CORS, so:
- Frontend (port 3000) ✅ can call backend
- Direct browser navigation ✅ works
- External tools (curl, Postman) ✅ work without CORS restrictions

---

## Best Practices

### For Frontend Integration

1. **Error Handling:** Always check response status before accessing data
   ```typescript
   if (!response.ok) {
     throw new Error(`API error: ${response.statusText}`);
   }
   ```

2. **Retry Logic:** Implement exponential backoff for network errors
   ```typescript
   const maxRetries = 3;
   for (let i = 0; i < maxRetries; i++) {
     try {
       return await fetch(url);
     } catch (e) {
       if (i === maxRetries - 1) throw e;
       await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
     }
   }
   ```

3. **Timeouts:** Set reasonable fetch timeouts
   ```typescript
   const controller = new AbortController();
   const timeout = setTimeout(() => controller.abort(), 10000);
   const response = await fetch(url, { signal: controller.signal });
   clearTimeout(timeout);
   ```

4. **Caching:** Cache GitHub analysis results client-side
   ```typescript
   const cache = new Map();
   if (cache.has(username)) {
     return cache.get(username);
   }
   const result = await fetchAnalysis(username);
   cache.set(username, result);
   ```

### For Backend Optimization

1. **Response Caching:** Cache GitHub API results (1-24 hours)
2. **Pagination:** Fetch only first 100 repos by default
3. **Async Processing:** Use job queues for resume parsing
4. **Database:** Store user analyses for quick retrieval

---

## Environment Variables

**Backend (.env):**
```
APP_NAME=SkillLens API
API_PREFIX=/api
GITHUB_USER_AGENT=SkillLens-Analyzer
GITHUB_TOKEN=<optional>
GROQ_API_KEY=<required for resume parsing>
GROQ_MODEL=mixtral-8x7b-32768
FRONTEND_ORIGINS=http://localhost:3000,https://app.skilllens.com
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

---

## Testing Endpoints

### Using cURL

```bash
# Test health
curl http://127.0.0.1:8000/api/health

# Test GitHub analysis
curl "http://127.0.0.1:8000/api/analyze?username=torvalds"

# Test resume parsing
curl -X POST http://127.0.0.1:8000/api/resume \
  -H "Content-Type: application/json" \
  -d '{"resume":"Python expert with Django experience"}'

# Test file upload
curl -X POST http://127.0.0.1:8000/api/upload \
  -F "file=@sample.txt"
```

### Using Postman

1. Import collection or create requests for each endpoint
2. Set variables: `{{BASE_URL}}` = `http://127.0.0.1:8000`
3. Use pre-request scripts for authentication (future)
4. Test with example values

### Using Python

```python
import httpx

async with httpx.AsyncClient() as client:
    # Health check
    response = await client.get("http://127.0.0.1:8000/api/health")
    print(response.json())
    
    # GitHub analysis
    response = await client.get(
        "http://127.0.0.1:8000/api/analyze",
        params={"username": "torvalds"}
    )
    print(response.json())
```

---

**Last Updated:** 2024
**API Version:** 1.0.0
