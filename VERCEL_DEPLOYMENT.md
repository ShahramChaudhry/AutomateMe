# Vercel Deployment Guide

## Quick Deployment (Recommended Approach)

### Architecture
- **Frontend** → Vercel (Next.js)
- **Backend** → Railway or Render (FastAPI)

This is the easiest and most reliable setup.

---

## Step 1: Deploy Backend to Railway

### Option A: Railway (Recommended - Easiest)

1. **Create Railway account**: https://railway.app/
2. **Install Railway CLI** (optional):
   ```bash
   npm install -g @railway/cli
   ```

3. **Deploy via Dashboard**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository
   - Railway auto-detects Python app
   - Add environment variables:
     - `GOOGLE_API_KEY` = your Gemini key
     - `GEMINI_MODEL` = gemini-2.5-flash
     - `FRONTEND_URL` = https://your-app.vercel.app (add this later)

4. **Get your backend URL**:
   - Railway provides URL like: `https://your-app.railway.app`
   - Copy this URL for frontend config

### Option B: Render

1. **Create Render account**: https://render.com/
2. **New Web Service**:
   - Connect GitHub repo
   - Select Python
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Select Free tier (spins down after inactivity)

3. **Add environment variables** in Render dashboard:
   - `GOOGLE_API_KEY`
   - `GEMINI_MODEL`
   - `FRONTEND_URL`

4. **Get backend URL** from Render (e.g., `https://your-app.onrender.com`)

---

## Step 2: Deploy Frontend to Vercel

### Via Vercel Dashboard (Easiest)

1. **Create Vercel account**: https://vercel.com/
2. **Import Project**:
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure Build Settings**:
   - Framework Preset: **Next.js**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variable**:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your Railway/Render backend URL (e.g., `https://your-app.railway.app`)

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your URL: `https://your-app.vercel.app`

6. **Update Backend CORS**:
   - Go back to Railway/Render
   - Update `FRONTEND_URL` env var to your Vercel URL
   - Backend will restart automatically

### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set root directory if needed
# - Add NEXT_PUBLIC_API_URL environment variable

# Production deployment
vercel --prod
```

---

## Step 3: Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try analyzing a workflow
3. Check browser console for any CORS errors
4. Verify API calls reach your backend

---

## Complete Environment Variables Setup

### Backend (Railway/Render)
```
GOOGLE_API_KEY=your-google-api-key-here
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

---

## Alternative: Deploy Backend to Vercel (Advanced)

Vercel supports Python serverless functions, but requires refactoring FastAPI into serverless handlers.

**Skip this unless you specifically want everything on Vercel.**

Create `api/analyze.py`:
```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import sys
sys.path.append('..')
from backend.analyzer import analyze_text_workflow

app = FastAPI()

@app.post("/api/analyze/text")
async def analyze(request: Request):
    data = await request.json()
    result = await analyze_text_workflow(
        data['workflow_name'],
        data['team'],
        data.get('tools_used'),
        data['description']
    )
    return JSONResponse(content=result.dict())
```

This approach is more complex and has cold start delays.

---

## Recommended Setup Summary

```
┌─────────────────┐
│   Users         │
└────────┬────────┘
         │
         │ HTTPS
         ▼
┌─────────────────┐
│  Vercel         │
│  (Frontend)     │
│  Next.js App    │
└────────┬────────┘
         │
         │ REST API
         ▼
┌─────────────────┐
│  Railway        │
│  (Backend)      │
│  FastAPI        │
└────────┬────────┘
         │
         │ API Calls
         ▼
┌─────────────────┐
│  Gemini API     │
└─────────────────┘
```

**Why this works best:**
- Vercel is optimized for Next.js (instant deployment)
- Railway is optimized for backend services (always-on)
- Both have generous free tiers
- Simple environment variable management
- No cold starts

---

## Deployment Checklist

- [ ] Push code to GitHub
- [ ] Deploy backend to Railway/Render
- [ ] Copy backend URL
- [ ] Deploy frontend to Vercel
- [ ] Add `NEXT_PUBLIC_API_URL` env var in Vercel
- [ ] Update `FRONTEND_URL` in backend
- [ ] Test the deployed app
- [ ] Celebrate! 🎉

---

## Costs

**Vercel Free Tier:**
- Unlimited deployments
- 100 GB bandwidth/month
- Perfect for this MVP

**Railway Free Tier:**
- $5 free credits/month
- ~500 hours of usage
- More than enough for testing

**Render Free Tier:**
- Free tier available
- Spins down after 15 min inactivity
- First request may be slow (cold start)

**Total Cost: $0/month** on free tiers!

---

## Quick Deploy Commands

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy AutomateMe"
git push origin main

# 2. Deploy backend (Railway CLI)
cd backend
railway login
railway init
railway up

# 3. Deploy frontend (Vercel CLI)
cd ../frontend
vercel login
vercel --prod

# 4. Update environment variables in both dashboards
```

---

Need help with specific deployment? Let me know which platform you prefer!
