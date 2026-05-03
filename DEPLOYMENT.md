# Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] API keys obtained (Groq, optional GitHub token)
- [ ] .env files removed from git (added to .gitignore)
- [ ] TypeScript compilation successful
- [ ] No console errors in development
- [ ] CORS origins updated for production domains
- [ ] Database migrations ready (if using DB)
- [ ] Monitoring/logging setup
- [ ] Backup strategy defined

---

## Backend Deployment

### Option 1: Heroku (Recommended for Beginners)

#### Step 1: Install Heroku CLI
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
heroku login
```

#### Step 2: Create Heroku App
```bash
cd backend
heroku create your-app-name
# Creates: https://your-app-name.herokuapp.com
```

#### Step 3: Create Procfile
Create `backend/Procfile`:
```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

#### Step 4: Add Environment Variables
```bash
heroku config:set GROQ_API_KEY=your_key_here
heroku config:set GITHUB_TOKEN=your_token_here
heroku config:set FRONTEND_ORIGINS=https://your-frontend.com,https://www.your-frontend.com
```

#### Step 5: Deploy
```bash
git push heroku main
```

#### Step 6: View Logs
```bash
heroku logs --tail
```

**Result:** Backend running at `https://your-app-name.herokuapp.com`

---

### Option 2: Railway (Simple & Fast)

#### Step 1: Visit Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project

#### Step 2: Add Python Service
1. Click "Add Service" → "GitHub Repo"
2. Select your repo
3. Connect backend folder

#### Step 3: Configure Environment
In Railway dashboard:
1. Settings → Variables
2. Add: GROQ_API_KEY, GITHUB_TOKEN, FRONTEND_ORIGINS
3. Ensure PORT is set (Railway sets it automatically)

#### Step 4: Add start.sh
Create `backend/start.sh`:
```bash
#!/bin/bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

#### Step 5: Deploy
Push to GitHub → Railway auto-deploys

**Result:** Backend running at Railway domain

---

### Option 3: AWS Lambda + API Gateway

#### Step 1: Install AWS CLI
```bash
pip install awscli-local
aws configure
```

#### Step 2: Install Serverless Framework
```bash
npm install -g serverless
serverless create --template aws-python-fastapi --path backend-lambda
```

#### Step 3: Create serverless.yml
```yaml
service: skilllens-api

provider:
  name: aws
  runtime: python3.11
  stage: ${opt:stage, 'dev'}
  region: us-east-1
  environment:
    GROQ_API_KEY: ${env:GROQ_API_KEY}
    GITHUB_TOKEN: ${env:GITHUB_TOKEN}

functions:
  api:
    handler: app.main.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
    environment:
      PYTHONPATH: /var/task

plugins:
  - serverless-python-requirements

custom:
  pythonRequirements:
    dockerizePip: true
```

#### Step 4: Deploy
```bash
serverless deploy --stage production
```

**Result:** API Gateway endpoint (auto-scaling)

---

### Option 4: Docker + Render

#### Step 1: Create Dockerfile
Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Step 2: Push to GitHub
```bash
git add backend/Dockerfile
git commit -m "Add Dockerfile"
git push
```

#### Step 3: Connect Render
1. Visit https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Select branch: main
5. Environment: Docker
6. Add environment variables

#### Step 4: Deploy
Render auto-deploys on push

**Result:** Backend running on Render domain

---

## Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)

#### Step 1: Push to GitHub
```bash
git push origin main
```

#### Step 2: Import to Vercel
1. Visit https://vercel.com
2. Click "Import Project"
3. Select GitHub repo
4. Configure project:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Step 3: Add Environment Variables
In Vercel dashboard:
- Settings → Environment Variables
- Add: `NEXT_PUBLIC_BACKEND_URL=https://your-backend.com`

#### Step 4: Deploy
Click "Deploy" → Auto-deploys on push

**Result:** Frontend at `your-project.vercel.app`

---

### Option 2: Netlify

#### Step 1: Connect Repository
1. Visit https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub
4. Select repo

#### Step 2: Configure Build
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `.next`

#### Step 3: Add Environment Variables
- Build & deploy → Environment
- Add: `NEXT_PUBLIC_BACKEND_URL=https://your-backend.com`

#### Step 4: Deploy
Automatic on push

**Result:** Frontend at `your-site.netlify.app`

---

### Option 3: AWS S3 + CloudFront

#### Step 1: Build Static Export
```bash
cd frontend
npm run build
npm run export
```

#### Step 2: Create S3 Bucket
```bash
aws s3 mb s3://my-skilllens-app
```

#### Step 3: Upload Build
```bash
aws s3 sync out/ s3://my-skilllens-app/
```

#### Step 4: Configure CloudFront
1. AWS CloudFront → Create distribution
2. Origin: S3 bucket
3. Behavior: Redirect to index.html for 404
4. Distribution domain: Your CDN URL

**Result:** Frontend on CloudFront (globally cached)

---

### Option 4: Docker + Render

#### Step 1: Create Dockerfile
Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ARG NEXT_PUBLIC_BACKEND_URL=https://api.skilllens.com
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
```

#### Step 2: Push to GitHub & Deploy
Same as backend Docker approach

---

## Database Setup (Optional)

### PostgreSQL with Heroku

#### Step 1: Add PostgreSQL Add-on
```bash
cd backend
heroku addons:create heroku-postgresql:hobby-dev
```

#### Step 2: Get Connection String
```bash
heroku config:get DATABASE_URL
```

#### Step 3: Update Backend
```python
# backend/app/core/config.py
database_url: str = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@localhost/skilllens"
)
```

#### Step 4: Run Migrations
```bash
alembic upgrade head
```

---

## Environment Variables Summary

### Backend Production (.env)
```env
APP_NAME=SkillLens API
API_PREFIX=/api
GITHUB_USER_AGENT=SkillLens-Analyzer
GITHUB_TOKEN=<github-token>
GROQ_API_KEY=<groq-key>
GROQ_MODEL=mixtral-8x7b-32768
FRONTEND_ORIGINS=https://app.skilllens.com,https://www.skilllens.com

# Optional Database
DATABASE_URL=postgresql://user:pass@host/db

# Optional Redis
REDIS_URL=redis://host:6379
```

### Frontend Production (.env.production)
```env
NEXT_PUBLIC_BACKEND_URL=https://api.skilllens.com
NEXT_PUBLIC_GA_ID=<google-analytics-id>  # Optional
```

---

## Performance Optimization

### Backend
```python
# backend/app/main.py - Add caching
from fastapi_cache2 import FastAPICache2
from fastapi_cache2.backends.redis import RedisBackend

@app.get("/api/analyze")
@cached(expire=3600)  # Cache for 1 hour
async def analyze_github_profile(username: str):
    # Endpoint code
```

### Frontend
```typescript
// frontend/src/lib/backend.ts - Add request deduplication
const requestCache = new Map();

export async function fetchGithubAnalysis(username: string) {
  const cacheKey = `analysis-${username}`;
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }
  
  const result = await fetch(...);
  requestCache.set(cacheKey, result);
  return result;
}
```

---

## Monitoring & Logging

### Backend Logging
```python
# backend/app/main.py
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.get("/api/analyze")
async def analyze_github_profile(username: str):
    logger.info(f"Analyzing user: {username}")
    # ...
```

### Frontend Error Tracking
```typescript
// frontend/src/lib/backend.ts
export async function reportError(error: Error, context: string) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service (Sentry, LogRocket, etc.)
    await fetch('/api/errors', {
      method: 'POST',
      body: JSON.stringify({ error: error.message, context })
    });
  }
}
```

### Services to Use
- **Error Tracking:** Sentry, LogRocket
- **Performance Monitoring:** New Relic, DataDog
- **Log Aggregation:** ELK Stack, Datadog, LogDNA
- **Uptime Monitoring:** UptimeRobot, Pingdom

---

## Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy Backend
        run: |
          cd backend
          git push heroku main
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm run build
          vercel --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Rollback Strategy

### Backend (Heroku)
```bash
# List releases
heroku releases

# Rollback to previous version
heroku rollback
```

### Frontend (Vercel)
1. Dashboard → Deployments
2. Click deployment to rollback
3. Click "Promote to Production"

---

## Security in Production

### HTTPS/SSL
- All platforms auto-provide HTTPS
- Force redirect HTTP → HTTPS

### API Keys
- Never commit .env files
- Use platform secret management
- Rotate keys regularly

### CORS
- Set specific origins (not *)
- List production domains only

### Database
- Use managed services (they handle security)
- Enable backups
- Use connection pooling

### Secrets Management
```bash
# Using environment variables on platform
heroku config:set SECRET_KEY=your_secret

# Access in code
import os
secret = os.getenv('SECRET_KEY')
```

---

## Scaling Strategy

### Phase 1: MVP (Current)
- Single backend instance
- Single frontend instance
- No database

### Phase 2: Growth
- Add database (PostgreSQL)
- Add Redis cache
- Horizontal scaling (load balancer)

### Phase 3: Enterprise
- Multi-region deployment
- CDN for static assets
- Microservices architecture
- Kubernetes orchestration

---

## Cost Estimation

| Service | Tier | Cost |
|---------|------|------|
| Heroku Backend | Hobby (free) | $0 |
| Heroku Backend | Standard-1x | $7/month |
| Heroku Database | Hobby (free) | $0 |
| Heroku Database | Starter | $9/month |
| Vercel Frontend | Free | $0 |
| Vercel Frontend | Pro | $20/month |
| Total (MVP) | - | $0-29/month |

---

## Troubleshooting Production Issues

### Backend crashes after deploy
```bash
# Check logs
heroku logs --tail

# Restart
heroku restart
```

### Frontend shows "Connection error"
1. Check backend URL in environment variables
2. Verify CORS origins in backend
3. Check network tab in browser DevTools

### High latency
1. Add caching (Redis)
2. Use CDN
3. Optimize database queries
4. Upgrade server tier

### High costs
1. Remove unused services
2. Use auto-scaling
3. Implement caching
4. Optimize database

---

## Disaster Recovery

### Backup Strategy
- Database: Daily automated backups
- Code: GitHub (version control)
- Secrets: Encrypted backup of .env

### Recovery Steps
1. Restore database from backup
2. Re-deploy from GitHub
3. Verify API functionality
4. Test user workflows

### RTO/RPO Targets
- RTO (Recovery Time Objective): < 1 hour
- RPO (Recovery Point Objective): < 1 day

---

## Post-Launch Checklist

- [ ] Monitor error logs for 24 hours
- [ ] Verify all endpoints working
- [ ] Test with real users
- [ ] Monitor performance metrics
- [ ] Set up alerts for downtime
- [ ] Create incident response plan
- [ ] Document runbooks for common issues
- [ ] Schedule security audit

---

**Last Updated:** 2024
**Version:** 1.0.0
