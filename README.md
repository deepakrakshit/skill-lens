# SkillLens - Technical Profile Analysis Platform

**Real GitHub-based technical profile analysis with zero fake data. Analyzes the latest 30 commits per repository to provide accurate skill detection and developer profiling.**

## 🎯 Core Features

- ✅ **Real GitHub Analysis** - No synthetic data, only actual repository activity
- ✅ **Commit-Based Evidence** - Latest 30 commits per repo analyzed
- ✅ **Skill Detection** - Programming languages and frameworks identified
- ✅ **Confidence Scoring** - Each skill ranked 0-100% based on actual usage
- ✅ **Comprehensive Dashboard** - User profile, skills, languages, commits, insights
- ✅ **No Fake Animations** - Clean, data-focused interface

## 🏗️ Architecture

## Project Structure

```
NIET/
├── backend/                    # Python FastAPI service (port 8000)
│   ├── app/                   # Main application code
│   ├── .venv/                 # Python virtual environment
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example           # Environment template
│   └── README.md              # Backend documentation
│
├── frontend/                  # Next.js React application (port 3000)
│   ├── src/                   # React components & pages
│   ├── package.json           # npm dependencies
│   ├── .env.local.example     # Environment template
│   └── README.md              # Frontend documentation
│
├── GETTING_STARTED.md         # ⭐ Start here!
├── ARCHITECTURE.md            # System design
├── API_DOCUMENTATION.md       # API reference
└── DEPLOYMENT.md              # Production deployment
```

## Quick Start

### 1. Backend (5 minutes)

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate        # On Windows; use `source .venv/bin/activate` on macOS/Linux
pip install -r requirements.txt
copy .env.example .env          # Edit with your API keys
python -m uvicorn app.main:app --reload --port 8000
```

Backend running at: **http://127.0.0.1:8000** ✅

### 2. Frontend (5 minutes)

```bash
cd frontend
npm install --legacy-peer-deps
copy .env.local.example .env.local
npm run dev
```

Frontend running at: **http://localhost:3000** ✅

### 3. Test It Out

1. Open http://localhost:3000 in your browser
2. Enter a GitHub username (e.g., `octocat`, `torvalds`)
3. Click "Analyze" to see live GitHub analysis
4. View dashboard with metrics and detected skills

## Technology Stack

### Backend
- **FastAPI 0.115+** - Modern Python web framework
- **Uvicorn** - ASGI server for async performance
- **Pydantic 2.10+** - Data validation and serialization
- **httpx** - Async HTTP client
- **PyPDF, python-docx, python-pptx** - File parsing

### Frontend
- **Next.js 16.2.4** - React framework with SSR
- **React 19.2.4** - UI library
- **TypeScript 5.6+** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animations
- **React Three Fiber** - 3D rendering

### External APIs
- **GitHub API** - Public repository data
- **Groq API** - LLM for skill extraction

## Key Features

### GitHub Analysis
- Fetch user profile data (followers, bio, join date)
- Analyze all public repositories
- Detect programming languages and frameworks
- Calculate confidence scores for each skill
- Support for 40+ programming languages
- 25+ framework detection patterns

### Metrics Dashboard
- **Trust Score** - Average confidence of detected skills (0-100)
- **JD Match** - Percentage alignment with job requirements
- **Placement Readiness** - Career readiness tier (Ready/Borderline/Needs Work)
- **Evidence Count** - Number of repositories analyzed

### Resume Processing
- Support for multiple file formats (PDF, DOCX, PPTX, TXT, MD)
- Intelligent skill extraction using LLM
- Text cleaning and normalization
- Structured skill categories

## Configuration

### Environment Variables

**Backend (.env):**
```env
GROQ_API_KEY=your_groq_api_key_here
GITHUB_TOKEN=optional_github_token
FRONTEND_ORIGINS=http://localhost:3000,https://your-domain.com
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

See [GETTING_STARTED.md](./GETTING_STARTED.md) for detailed setup instructions.

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Server health check |
| GET | `/api/analyze?username=...` | Analyze GitHub profile |
| POST | `/api/resume` | Parse resume and extract skills |
| POST | `/api/upload` | Upload file and extract text |

Full details in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Development

### Local Development

```bash
# Terminal 1: Backend
cd backend
.\.venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Making Changes

- **Backend:** Edit `backend/app/` files → auto-reloads via uvicorn
- **Frontend:** Edit `frontend/src/` files → auto-reloads via Next.js

### Testing Endpoints

```bash
# Health check
curl http://127.0.0.1:8000/api/health

# Analyze GitHub user
curl "http://127.0.0.1:8000/api/analyze?username=torvalds"

# Parse resume
curl -X POST http://127.0.0.1:8000/api/resume \
  -H "Content-Type: application/json" \
  -d '{"resume":"Python expert with Django experience"}'
```

## Deployment

### One-Click Deployment

**Backend:**
- ☁️ [Heroku](./DEPLOYMENT.md#option-1-heroku-recommended-for-beginners)
- 🚂 [Railway](./DEPLOYMENT.md#option-2-railway-simple--fast)
- ☁️ [AWS Lambda](./DEPLOYMENT.md#option-3-aws-lambda--api-gateway)
- 🐳 [Docker + Render](./DEPLOYMENT.md#option-4-docker--render)

**Frontend:**
- ▲ [Vercel](./DEPLOYMENT.md#option-1-vercel-recommended-for-nextjs)
- 🌐 [Netlify](./DEPLOYMENT.md#option-2-netlify)
- ☁️ [AWS S3 + CloudFront](./DEPLOYMENT.md#option-3-aws-s3--cloudfront)
- 🐳 [Docker + Render](./DEPLOYMENT.md#option-4-docker--render)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Architecture

The application follows a decoupled microservices pattern:

```
┌─────────────────────────────────────────────────┐
│              Frontend (Next.js)                  │
│           http://localhost:3000                 │
│                                                 │
│  • Homepage: GitHub username input              │
│  • Dashboard: Live analytics metrics            │
│  • Components: Modular React with TypeScript    │
└────────────┬────────────────────────────────────┘
             │ HTTP (CORS-enabled)
             │
┌────────────▼────────────────────────────────────┐
│              Backend (FastAPI)                   │
│           http://127.0.0.1:8000                 │
│                                                 │
│  • GitHub Analysis: Profile & skill detection   │
│  • Resume Parser: LLM-powered extraction        │
│  • File Upload: Multi-format support            │
└────────────┬────────────────────────────────────┘
             │ HTTP (async/await)
             │
     ┌───────┴──────────┐
     │                  │
  GitHub API         Groq LLM
(public repos)    (skill extraction)
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design.

## Troubleshooting

### Backend
- **ModuleNotFoundError**: Run `pip install -r requirements.txt`
- **Port 8000 in use**: Change port or kill process using it
- **GROQ_API_KEY not set**: Add to .env file

### Frontend
- **Command 'next' not found**: Run `npm install --legacy-peer-deps`
- **Port 3000 in use**: Use `npm run dev -- -p 3001`
- **Backend connection error**: Check NEXT_PUBLIC_BACKEND_URL in .env.local

See [GETTING_STARTED.md](./GETTING_STARTED.md#troubleshooting) for more solutions.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

- 📖 [Documentation](./GETTING_STARTED.md)
- 🐛 [Report Issues](../../issues)
- 💬 [Discussions](../../discussions)

## Roadmap

- [ ] User authentication & profiles
- [ ] Database for storing analyses
- [ ] Advanced job matching algorithm
- [ ] Portfolio recommendations
- [ ] Team collaboration features
- [ ] Mobile app
- [ ] AI-powered career coaching

## Credits

Built with ❤️ by the NIET team.

---

**Ready to get started?** Head over to [GETTING_STARTED.md](./GETTING_STARTED.md) 🚀
