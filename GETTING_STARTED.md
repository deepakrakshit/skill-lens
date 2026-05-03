# Getting Started Guide

## Quick Start (Local Development)

### Prerequisites

- **Python 3.10+** with pip
- **Node.js 18+** with npm
- **Git** (optional, for version control)
- Environment variables configured

### 1. Backend Setup

#### Step 1: Navigate to Backend Folder
```bash
cd backend
```

#### Step 2: Create Python Virtual Environment
```bash
# Windows
python -m venv .venv

# macOS/Linux
python3 -m venv .venv
```

#### Step 3: Activate Virtual Environment
```bash
# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# Windows (Command Prompt)
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

#### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 5: Configure Environment Variables

Create `.env` file in `backend/` directory:

```env
# Application Settings
APP_NAME=SkillLens API
API_PREFIX=/api

# GitHub API Configuration
GITHUB_USER_AGENT=SkillLens-Analyzer
GITHUB_TOKEN=<optional-github-token>

# Groq API Configuration (for resume parsing)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=mixtral-8x7b-32768

# Frontend Origins (for CORS)
FRONTEND_ORIGINS=http://localhost:3000,https://skilllens.vercel.app
```

**Getting API Keys:**

- **GROQ_API_KEY:** 
  1. Visit https://console.groq.com
  2. Sign up/login
  3. Generate API key
  4. Copy to .env

- **GITHUB_TOKEN (optional):**
  1. Visit https://github.com/settings/tokens
  2. Create Personal Access Token (no scopes needed for public repos)
  3. Copy to .env (increases rate limits from 60 to 5000 req/hour)

#### Step 6: Start Backend Server
```bash
# Windows
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# macOS/Linux
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Started reloader process
INFO:     Application startup complete.
```

**✅ Backend is running!** Visit http://127.0.0.1:8000/api/health to verify.

---

### 2. Frontend Setup

#### Step 1: Open New Terminal, Navigate to Frontend
```bash
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install --legacy-peer-deps
```

#### Step 3: Configure Environment Variables

Create `.env.local` file in `frontend/` directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

This tells the frontend where to find the backend API. Change the URL for production deployments.

#### Step 4: Start Frontend Server
```bash
npm run dev
```

Expected output:
```
▲ Next.js 16.2.4
- Local:         http://localhost:3000
✓ Ready in 673ms
```

**✅ Frontend is running!** Visit http://localhost:3000 in your browser.

---

## Testing the Application

### 1. Homepage
- Navigate to http://localhost:3000
- See the hero section with GitHub username input form
- Try entering a GitHub username (e.g., `torvalds`, `octocat`)
- Click "Analyze" button

### 2. Dashboard
- After entering a username, you'll be redirected to `/dashboard?username=octocat`
- Dashboard will fetch real GitHub analysis from backend
- See live metrics:
  - **Trust Score:** Average confidence of detected skills (0-100)
  - **JD Match:** Percentage match with typical job requirements
  - **Placement Readiness:** Career readiness tier (Ready/Borderline/Needs Work)
  - **Evidence Count:** Number of repositories analyzed
- See top 4 skills with confidence percentages
- Skills are pulled from GitHub repository analysis

### 3. Demo Test Cases

```bash
# Frontend running at localhost:3000
# Backend running at 127.0.0.1:8000

# Test 1: Popular GitHub User
Input: torvalds
Expected: High skill diversity, Python as primary skill

# Test 2: Active Developer
Input: octocat
Expected: Multiple repos, various frameworks detected

# Test 3: Invalid Username
Input: xyzabcnotarealuser123
Expected: Error message displayed, backend returns 404
```

### 4. Backend Health Check

```bash
# In terminal or browser:
curl http://127.0.0.1:8000/api/health

# Expected response:
# {"status":"ok"}
```

### 5. Direct API Testing

```bash
# Test GitHub analysis endpoint
curl "http://127.0.0.1:8000/api/analyze?username=octocat"

# Test resume parsing endpoint
curl -X POST http://127.0.0.1:8000/api/resume \
  -H "Content-Type: application/json" \
  -d '{"resume":"Python expert with 5 years Django experience"}'
```

---

## Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'uvicorn'`
```bash
# Solution: Install dependencies
pip install -r requirements.txt
```

**Problem:** `GROQ_API_KEY not set`
```bash
# Solution: Create .env file with GROQ_API_KEY
# See Step 5 above
```

**Problem:** `Port 8000 already in use`
```bash
# Solution: Use different port
uvicorn app.main:app --port 8001

# Or kill process using port 8000:
# Windows: netstat -ano | findstr :8000
# macOS/Linux: lsof -i :8000
```

**Problem:** GitHub API rate limit exceeded
```
Solution: Set GITHUB_TOKEN in .env
# Increases from 60 to 5000 requests/hour
```

### Frontend Issues

**Problem:** `Command 'next' not found`
```bash
# Solution: Install dependencies
npm install --legacy-peer-deps
```

**Problem:** `Port 3000 already in use`
```bash
# Solution: Use different port
npm run dev -- -p 3001
```

**Problem:** `NEXT_PUBLIC_BACKEND_URL not set`
```bash
# Solution: Create .env.local file
echo "NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000" > .env.local
```

**Problem:** `Backend URL shows in browser console`
```
This is OK! NEXT_PUBLIC_* variables are intentionally exposed to browser.
Security-sensitive keys should NOT use this prefix.
```

### Connection Issues

**Problem:** Frontend can't connect to backend
```bash
# Check 1: Backend is running
curl http://127.0.0.1:8000/api/health

# Check 2: Correct backend URL in .env.local
# Should be: http://127.0.0.1:8000 (not localhost)

# Check 3: CORS headers in browser console
# If CORS error, backend origins config may be wrong
```

**Problem:** Dashboard shows "Connection error"
```bash
# Check backend logs for errors
# Check network tab in browser DevTools for failed requests
# Verify username parameter in URL: /dashboard?username=torvalds
```

---

## Project Structure Overview

```
NIET/
├── backend/                    # Python FastAPI server
│   ├── .venv/                 # Virtual environment
│   ├── app/                   # Main application
│   │   ├── main.py           # FastAPI app initialization
│   │   ├── models.py         # Pydantic models
│   │   ├── api/              # Route handlers
│   │   ├── services/         # Business logic (GitHub, resume, upload)
│   │   └── core/             # Config and constants
│   ├── requirements.txt       # Dependencies
│   ├── .env                  # Environment variables (create this)
│   └── README.md             # Backend-specific docs
│
├── frontend/                  # Next.js React app
│   ├── src/
│   │   ├── app/              # Page components
│   │   │   ├── page.tsx      # Homepage
│   │   │   └── dashboard/    # Analytics dashboard
│   │   ├── components/       # Reusable UI components
│   │   └── lib/              # Utilities and API client
│   ├── package.json          # Dependencies
│   ├── .env.local            # Environment variables (create this)
│   └── README.md             # Frontend-specific docs
│
├── ARCHITECTURE.md           # System design documentation
├── API_DOCUMENTATION.md      # API reference
├── GETTING_STARTED.md        # This file
└── DEPLOYMENT.md             # Production deployment guide
```

---

## Development Workflow

### 1. Making Backend Changes

1. Edit files in `backend/app/`
2. Backend auto-reloads (uvicorn --reload flag)
3. Changes take effect immediately
4. Check console for errors

### 2. Making Frontend Changes

1. Edit files in `frontend/src/`
2. Frontend auto-reloads (Next.js dev server)
3. See changes in browser (hot reload)
4. Check console for TypeScript errors

### 3. Adding New Dependencies

**Backend:**
```bash
cd backend
.\.venv\Scripts\activate  # Activate venv
pip install new-package
pip freeze > requirements.txt  # Update requirements
```

**Frontend:**
```bash
cd frontend
npm install new-package
npm run build  # Verify no TS errors
```

---

## Stopping the Servers

### Backend
```bash
# In backend terminal, press:
CTRL+C

# Deactivate virtual environment:
deactivate
```

### Frontend
```bash
# In frontend terminal, press:
CTRL+C

# Optionally kill Node process:
# Windows: taskkill /F /IM node.exe
```

---

## Next Steps

### 1. Explore the Features
- Analyze different GitHub profiles
- Try different usernames
- Test edge cases

### 2. Customize
- Modify skill detection in `backend/app/core/constants.py`
- Update UI components in `frontend/src/components/`
- Change colors in `frontend/src/app/globals.css`

### 3. Deploy
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Deploy backend to Heroku/Railway/AWS
- Deploy frontend to Vercel/Netlify

### 4. Extend
- Add database (PostgreSQL) for user profiles
- Add authentication (OAuth with GitHub)
- Add resume file upload with PDF parsing
- Add job matching algorithm

---

## Performance Tips

### Backend
- Add Redis caching for GitHub API results
- Implement request rate limiting
- Use database for frequently accessed data
- Add async task queue for resume processing

### Frontend
- Enable image optimization (`next/image`)
- Implement code splitting
- Use React.memo for expensive components
- Add service worker for offline support

---

## Security Checklist

- [ ] GitHub token kept in .env (not committed)
- [ ] Groq API key kept in .env (not committed)
- [ ] .env.local kept in .env.local (not committed)
- [ ] CORS origins configured correctly
- [ ] No sensitive data in response bodies
- [ ] Input validation on all endpoints
- [ ] HTTPS in production
- [ ] Rate limiting enabled

---

## Support & Resources

### Documentation
- [Architecture Guide](./ARCHITECTURE.md)
- [API Reference](./API_DOCUMENTATION.md)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)

### External APIs
- [GitHub API](https://docs.github.com/en/rest)
- [Groq API](https://console.groq.com/docs)

### Community
- GitHub Issues (in your repo)
- Stack Overflow (tag: fastapi, next.js)
- Discord communities (FastAPI, Next.js)

---

**Last Updated:** 2024
**Version:** 1.0.0
