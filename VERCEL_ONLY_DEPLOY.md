# Deploy EVERYTHING to Vercel (Simplest Method)

## Overview

Deploy the entire app (frontend + backend) on Vercel only.
- Frontend: Next.js app
- Backend: Next.js API routes with Gemini SDK (no FastAPI needed!)

**One platform, zero complexity.**

---

## Step 1: Install Dependencies Locally

```bash
cd frontend
npm install
```

This installs:
- `@google/generative-ai` - Gemini Node.js SDK
- `pdf-parse` - PDF text extraction

---

## Step 2: Configure Environment

Create `frontend/.env.local`:
```bash
GOOGLE_API_KEY=<your-new-rotated-key>
GEMINI_MODEL=gemini-2.5-flash
```

---

## Step 3: Test Locally

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` and test a workflow.

**No backend server needed!** Everything runs in Next.js.

---

## Step 4: Push to GitHub

```bash
git add .
git commit -m "Vercel-only deployment ready"
git push origin main
```

---

## Step 5: Deploy to Vercel

### Via Dashboard (Easiest):

1. **Visit**: https://vercel.com/new

2. **Import** your repo: `ShahramChaudhry/AutomateMe`

3. **Configure**:
   - Framework: **Next.js** ✓
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables**:
   - Name: `GOOGLE_API_KEY`
   - Value: Your rotated Gemini API key
   - Environment: Production, Preview, Development (all)
   
   - Name: `GEMINI_MODEL`
   - Value: `gemini-2.5-flash`
   - Environment: Production, Preview, Development (all)

5. **Deploy**!

### Via CLI (Faster):

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project root
cd /Users/shahram/Documents/AutomateMe
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? [your account]
# - Link to existing project? N
# - Project name: automateme
# - In which directory? ./
# - Want to override? Y
# - Which settings? Framework Preset, Root Directory
# - Framework? Next.js
# - Root Directory? frontend

# Add environment variables
vercel env add GOOGLE_API_KEY production
# Paste your key

vercel env add GEMINI_MODEL production
# Enter: gemini-2.5-flash

# Deploy to production
vercel --prod
```

---

## Step 6: Done! 🎉

Your app is live at: `https://your-app.vercel.app`

Everything runs on Vercel:
- Frontend ✓
- API routes ✓
- Gemini integration ✓

---

## How It Works

```
User Browser
     ↓
Vercel (Next.js App)
     ├─ Frontend UI (pages)
     └─ API Routes (/api/analyze/*)
         └─ Gemini SDK (Node.js)
             └─ Google Gemini API
```

**No separate backend needed!**

---

## Environment Variables on Vercel

After deployment, verify in Vercel dashboard:

**Settings → Environment Variables**
```
GOOGLE_API_KEY = <your-key>
GEMINI_MODEL = gemini-2.5-flash
```

Make sure they're added to all environments (Production, Preview, Development).

---

## Cost: $0/month

- Vercel Free Tier: ✓
- Gemini Free Tier: ✓ (1,500/day)
- **Total: FREE**

---

## Troubleshooting

### Build fails on Vercel

**Check:**
- Root directory is `frontend`
- `package.json` has all dependencies
- Environment variables are set

### API returns 500 errors

**Check:**
- `GOOGLE_API_KEY` is set in Vercel dashboard
- Check Vercel Function Logs (Dashboard → Functions tab)
- Verify key is valid at https://aistudio.google.com/app/apikey

### "Module not found" errors

**Fix:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

---

## Deployment Checklist

- [ ] Rotated API key (deleted old one)
- [ ] Installed frontend dependencies locally
- [ ] Tested locally (frontend only, no backend needed)
- [ ] Pushed to GitHub
- [ ] Imported repo into Vercel
- [ ] Set root directory to `frontend`
- [ ] Added `GOOGLE_API_KEY` in Vercel
- [ ] Added `GEMINI_MODEL` in Vercel
- [ ] Deployed successfully
- [ ] Tested live app

---

## Updating After Deployment

Every push to `main` branch auto-deploys to Vercel!

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel automatically builds and deploys
# Check progress at vercel.com/dashboard
```

---

## Project Structure (Vercel-Only)

```
AutomateMe/
└── frontend/                    # Everything runs from here!
    ├── app/
    │   ├── page.tsx            # Main UI
    │   ├── layout.tsx          # Root layout
    │   ├── globals.css         # Styles
    │   └── api/                # Backend API routes
    │       ├── analyze/
    │       │   ├── text/route.ts     # Text analysis
    │       │   ├── pdf/route.ts      # PDF analysis
    │       │   └── image/route.ts    # Image analysis
    │       └── lib/
    │           └── pdfParser.ts      # PDF utility
    ├── package.json
    └── ...

# Backend folder not needed for Vercel deployment
# Everything runs in Next.js API routes!
```

---

## Success Indicators

✅ Vercel build completes without errors  
✅ App loads at your Vercel URL  
✅ Can analyze workflows via text input  
✅ Can upload and analyze PDFs  
✅ Can upload and analyze images  
✅ Results display correctly  

---

**Your app is now 100% on Vercel - frontend AND backend! 🚀**
