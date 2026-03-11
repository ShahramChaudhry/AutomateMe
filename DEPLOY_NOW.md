# Deploy to Vercel (5 Minutes)

## Quick Deploy Steps

### Step 1: Push to GitHub (if not already)

```bash
git init
git add .
git commit -m "Initial commit - AI Ops Auditor"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy Backend to Railway

1. Visit: **https://railway.app/**
2. Click **"Start a New Project"**
3. Click **"Deploy from GitHub repo"**
4. Select your repository
5. Select **backend** folder
6. Add environment variables:
   ```
   GOOGLE_API_KEY = <your-gemini-api-key>
   GEMINI_MODEL = gemini-2.5-flash
   FRONTEND_URL = https://YOUR-APP.vercel.app (update after step 3)
   ```
7. Click **"Deploy"**
8. Wait 2-3 minutes
9. Copy your backend URL (e.g., `https://your-app.up.railway.app`)

### Step 3: Deploy Frontend to Vercel

1. Visit: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select your GitHub repository
4. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variable**:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your Railway backend URL (from step 2)

6. Click **"Deploy"**
7. Wait 2-3 minutes
8. Get your frontend URL: `https://your-app.vercel.app`

### Step 4: Update Backend CORS

1. Go back to **Railway dashboard**
2. Add/update environment variable:
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```
3. Backend will auto-restart

### Step 5: Test It!

1. Visit your Vercel URL
2. Try analyzing a workflow
3. Verify it works end-to-end

---

## One-Click Vercel Deploy (Frontend Only)

If you just want to deploy frontend first:

```bash
cd frontend
npx vercel --prod
```

Follow the prompts:
- Set up and deploy: **Y**
- Which scope: Select your account
- Link to existing project: **N**
- Project name: `ai-ops-auditor`
- In which directory: `.` (current)
- Override settings: **N**

---

## Environment Variables Summary

### Backend (Railway/Render)
```bash
GOOGLE_API_KEY=<your-gemini-api-key>
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

---

## Troubleshooting Deployment

### "Build failed" on Vercel
- Make sure Root Directory is set to `frontend`
- Verify `npm run build` works locally first
- Check Node version (should be 18+)

### "CORS error" in production
- Verify `FRONTEND_URL` in backend matches Vercel URL exactly
- Check backend logs for CORS errors
- Make sure backend restarted after changing env var

### "API key not valid"
- Double-check `GOOGLE_API_KEY` in Railway/Render
- Make sure there are no extra spaces
- Verify key works locally first

### Backend takes long to respond (Render free tier)
- Free tier spins down after 15 min inactivity
- First request after idle takes 30-60 seconds to wake up
- Subsequent requests are fast
- Upgrade to paid tier ($7/mo) for always-on

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway/Render
- [ ] Backend env vars configured
- [ ] Backend URL copied
- [ ] Frontend deployed to Vercel  
- [ ] Frontend env var added (`NEXT_PUBLIC_API_URL`)
- [ ] Backend `FRONTEND_URL` updated with Vercel URL
- [ ] Tested production app
- [ ] Works end-to-end

---

## Cost Estimate

**Development/Low Traffic:**
- Vercel: Free
- Railway: Free ($5 credit/month)
- Gemini: Free (1,500/day)
- **Total: $0/month**

**Production (1,000 analyses/day):**
- Vercel: Free (within limits)
- Railway: $5/month (hobby plan)
- Gemini: Free or ~$0.60/month
- **Total: ~$5-6/month**

---

## Alternative: Docker Deployment

If you prefer Docker:

```bash
# Deploy to Railway with Dockerfile
railway up --dockerfile backend/Dockerfile

# Or use Docker Compose on any VPS
docker-compose up -d
```

---

## Success! 🎉

Your app is now live on the internet!

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app`
- API Docs: `https://your-app.railway.app/docs`

Share with your team and start analyzing workflows!
