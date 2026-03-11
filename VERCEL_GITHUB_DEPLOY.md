# Deploy to Vercel from GitHub (Complete Guide)

## Architecture

Since Vercel doesn't run FastAPI natively, we use this hybrid approach:
- **Frontend (Next.js)** → Vercel
- **Backend (FastAPI)** → Railway (free tier)
- **Next.js API routes** → Proxy requests from frontend to backend

Benefits: Best of both worlds - Vercel for frontend, Railway for Python backend.

---

## Quick Deploy (5 Minutes)

### Step 1: Push to GitHub

```bash
# If not already a git repo:
git init

# Add and commit all files
git add .
git commit -m "AutomateMe - Ready for deployment"

# Create new repo on GitHub, then connect:
git remote add origin https://github.com/YOUR-USERNAME/automateme.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Railway (2 minutes)

1. **Visit**: https://railway.app/
2. **Sign up** with GitHub
3. Click **"New Project"**
4. Click **"Deploy from GitHub repo"**
5. **Select your repository**
6. Railway auto-detects Python app in `backend/`
7. **Add Environment Variables**:
   - `GOOGLE_API_KEY` = `<your-gemini-api-key>`
   - `GEMINI_MODEL` = `gemini-2.5-flash`
   - `FRONTEND_URL` = `*` (allows all origins for now)

8. Click **"Deploy"**
9. **Copy your Railway URL** (e.g., `https://web-production-xxxxx.up.railway.app`)

### Step 3: Deploy Frontend to Vercel (3 minutes)

1. **Visit**: https://vercel.com/new
2. **Import** your GitHub repository
3. **Configure Build Settings**:
   - Framework Preset: **Next.js** ✓ (auto-detected)
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variable**:
   - Name: `BACKEND_URL`
   - Value: Your Railway URL from Step 2
   - Environment: Production, Preview, Development (select all)

5. Click **"Deploy"**

6. **Copy your Vercel URL** (e.g., `https://automateme.vercel.app`)

### Step 4: Update Backend CORS (30 seconds)

1. Go back to **Railway dashboard**
2. Update environment variable:
   - `FRONTEND_URL` = Your Vercel URL from Step 3
3. Backend auto-restarts

### Step 5: Test! 🎉

Visit your Vercel URL and analyze a workflow!

---

## For Local Development

Your local setup now works like this:

```bash
# Terminal 1 - Backend (FastAPI on :8000)
cd backend
source venv/bin/activate
uvicorn main:app --reload

# Terminal 2 - Frontend (Next.js on :3000)
cd frontend
npm run dev
```

Frontend → Next.js API routes → FastAPI backend

---

## Deployment URLs

After deployment you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.up.railway.app`
- **API Docs**: `https://your-app.up.railway.app/docs`

---

## Environment Variables Summary

### Railway (Backend)
```
GOOGLE_API_KEY=<your-gemini-api-key>
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel (Frontend)
```
BACKEND_URL=https://your-app.up.railway.app
```

---

## Why This Approach?

**Can't we run Python on Vercel?**
- Vercel supports Python serverless functions, BUT:
  - Limited to 10-second execution time
  - No support for FastAPI directly
  - Cold starts on every request
  - Complex multipart file handling

**Railway for Backend is Better:**
- Always-on (no cold starts)
- Full FastAPI support
- File uploads work perfectly
- Free $5 credit/month
- Longer execution times

**Result**: Fast, reliable, free!

---

## Quick Commands

```bash
# 1. Push to GitHub
git add . && git commit -m "Deploy" && git push

# 2. Deploy backend (Railway dashboard)
# Visit railway.app → New Project → From GitHub

# 3. Deploy frontend (Vercel CLI)
npm install -g vercel
cd frontend
vercel --prod
```

---

## Troubleshooting

**Frontend deploys but gets 500 errors:**
- Check `BACKEND_URL` is set in Vercel
- Verify backend is running on Railway
- Check Railway logs for errors

**Backend won't start on Railway:**
- Verify `GOOGLE_API_KEY` is set
- Check Railway logs tab
- Ensure `requirements.txt` is in backend folder

**CORS errors:**
- Update `FRONTEND_URL` in Railway to match Vercel URL exactly
- Include `https://` in the URL

---

## Cost: $0/month

- Vercel Free: ✅ Unlimited deployments
- Railway Free: ✅ $5 credit/month
- Gemini Free: ✅ 1,500 requests/day

Perfect for MVP!

---

## Ready to Deploy?

1. Push code to GitHub
2. Deploy backend to Railway (link above)
3. Deploy frontend to Vercel (link above)
4. Update environment variables
5. Test your live app!

See `VERCEL_DEPLOY.md` for more details.
