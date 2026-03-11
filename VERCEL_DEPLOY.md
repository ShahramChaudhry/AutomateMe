# Deploy EVERYTHING to Vercel

## Overview

This setup deploys both frontend AND backend to Vercel using:
- Frontend: Next.js app (in `/frontend`)
- Backend: Python serverless functions (in `/api`)

Both run on Vercel's infrastructure!

---

## Step 1: Push to GitHub

```bash
# Initialize git if not already
git init

# Add all files
git add .

# Commit
git commit -m "AI Ops Auditor - Ready for Vercel deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel via Dashboard

### 2.1 Go to Vercel
Visit: **https://vercel.com/new**

### 2.2 Import Repository
- Click "Import Git Repository"
- Select your GitHub repo
- Click "Import"

### 2.3 Configure Project
Vercel will auto-detect Next.js. Configure:

**Framework Preset**: Next.js

**Root Directory**: `frontend`

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 2.4 Add Environment Variables
Click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `GOOGLE_API_KEY` | `<your-gemini-api-key>` |
| `GEMINI_MODEL` | `gemini-2.5-flash` |
| `NEXT_PUBLIC_API_URL` | `/api` |

**Important**: Add to all environments (Production, Preview, Development)

### 2.5 Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Vercel will build and deploy

### 2.6 Get Your URL
- Copy your deployment URL: `https://your-app.vercel.app`
- This is your live app!

---

## Step 3: Test Your Deployment

1. Visit `https://your-app.vercel.app`
2. Try the text input with a simple workflow
3. Check browser console for errors
4. Verify analysis completes

---

## Vercel CLI Method (Faster)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Setup and deploy? Y
# - Which scope? [your account]
# - Link to existing project? N
# - Project name: ai-ops-auditor
# - In which directory is your code? ./
# - Want to override settings? Y
# - Override Framework? Y → Next.js
# - Override Root Directory? Y → frontend
# - Override Build Command? N
# - Override Output Directory? N
# - Override Install Command? N

# Add environment variables
vercel env add GOOGLE_API_KEY
# Paste: <your-gemini-api-key>

vercel env add GEMINI_MODEL
# Paste: gemini-2.5-flash

vercel env add NEXT_PUBLIC_API_URL
# Paste: /api

# Deploy to production
vercel --prod
```

---

## Project Structure for Vercel

```
AutomateMe/
├── api/                    # Python serverless functions
│   ├── analyze_text.py     # /api/analyze_text endpoint
│   ├── analyze_pdf.py      # /api/analyze_pdf endpoint
│   ├── analyze_image.py    # /api/analyze_image endpoint
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # Next.js app
│   ├── app/
│   │   └── page.tsx       # Updated to use /api routes
│   └── ...
│
├── vercel.json            # Vercel configuration
└── ...
```

**How it works:**
- Vercel serves Next.js app from `/frontend`
- Vercel runs Python functions from `/api`
- Frontend calls `/api/analyze_text` (same domain, no CORS)
- Everything on one platform!

---

## Troubleshooting Vercel Deployment

### Build fails

**Check:**
- Root directory is set to `frontend`
- `npm run build` works locally
- All dependencies in `package.json`

**Fix:**
```bash
cd frontend
npm run build  # Test locally first
```

### API endpoints return 500 errors

**Check:**
- Environment variables are set in Vercel dashboard
- `GOOGLE_API_KEY` is correct
- Check Vercel Function logs (Dashboard → Functions tab)

**Fix:**
- Re-add environment variables
- Redeploy with `vercel --prod`

### "Module not found" in Python functions

**Check:**
- `api/requirements.txt` has all dependencies
- Vercel supports the dependency versions

**Fix:**
- Update `api/requirements.txt`
- Commit and push changes
- Vercel auto-redeploys

### CORS errors

**Should NOT happen** with this setup because:
- Frontend and backend are same domain
- API routes are at `/api/*`
- No cross-origin requests

If you see CORS errors:
- Clear browser cache
- Check `NEXT_PUBLIC_API_URL` is `/api` (not a full URL)

---

## Environment Variables in Vercel

### Add via Dashboard
1. Go to: `https://vercel.com/<your-username>/<project-name>`
2. Click "Settings" → "Environment Variables"
3. Add each variable
4. Select environments: Production, Preview, Development
5. Click "Save"

### Add via CLI
```bash
vercel env add GOOGLE_API_KEY production
# Paste your key when prompted

vercel env add GEMINI_MODEL production
# Enter: gemini-2.5-flash

vercel env add NEXT_PUBLIC_API_URL production
# Enter: /api
```

---

## Vercel Limits (Free Tier)

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless execution/month
- ✅ 1000 serverless function invocations/day

This is MORE than enough for your MVP and testing!

---

## Production Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Root directory set to `frontend`
- [ ] Environment variables added:
  - [ ] `GOOGLE_API_KEY`
  - [ ] `GEMINI_MODEL`
  - [ ] `NEXT_PUBLIC_API_URL`
- [ ] Deployed successfully
- [ ] Tested workflow analysis
- [ ] No console errors
- [ ] Share URL with team!

---

## Your Live App

Once deployed, you'll have:
- **URL**: `https://your-app.vercel.app`
- **API**: `https://your-app.vercel.app/api/analyze_text`
- **Auto-deploy**: Pushes to main branch auto-deploy
- **Preview URLs**: Every PR gets preview deployment

---

## Cost: $0/month

Everything runs on free tiers:
- Vercel: Free
- Gemini: Free (1,500/day)
- **Total: $0**

Perfect for MVP, demos, and early users!

---

## Need Help?

Run into issues? Check:
1. Vercel build logs (in dashboard)
2. Vercel function logs (Functions tab)
3. Browser console (F12)
4. `TROUBLESHOOTING.md`

---

**Ready to deploy? Push to GitHub and import into Vercel!** 🚀
