# Deploy to Vercel - Simple Guide

## Everything on Vercel (No Railway!)

The app now runs 100% on Vercel:
- Frontend: Next.js
- Backend: Next.js API routes with Gemini
- No separate Python backend needed

---

## Quick Deploy (3 Steps)

### Step 1: Rotate Your API Key First! 🔒

**IMPORTANT**: Your old key was exposed. Rotate it now:

1. Visit: https://aistudio.google.com/app/apikey
2. **Delete** the old key
3. **Create new** API key
4. Copy it

### Step 2: Update Local Environment

Edit `frontend/.env.local`:
```
GOOGLE_API_KEY=<your-new-key>
GEMINI_MODEL=gemini-2.5-flash
```

Test locally:
```bash
cd frontend
npm run dev
```

Visit http://localhost:3000 and verify it works.

### Step 3: Deploy to Vercel

**Option A: Via Dashboard (Easiest)**

1. Go to: **https://vercel.com/new**

2. **Import** your GitHub repo

3. **Configure**:
   - Root Directory: `frontend`
   - Framework: Next.js

4. **Add Environment Variables**:
   - `GOOGLE_API_KEY` = your NEW rotated key
   - `GEMINI_MODEL` = `gemini-2.5-flash`

5. Click **Deploy**

**Option B: Via CLI**

```bash
npm install -g vercel
vercel login
cd frontend
vercel --prod
```

When prompted for environment variables, add:
- `GOOGLE_API_KEY`
- `GEMINI_MODEL`

---

## That's It! 🎉

Your app is live at: `https://your-app.vercel.app`

---

## Important Notes

### What Changed
- ✅ Backend logic moved to Next.js API routes
- ✅ Gemini Node.js SDK (not Python)
- ✅ Everything in `/frontend` folder
- ✅ Single deployment to Vercel
- ✅ No Railway/Render needed

### Environment Variables
Only need these in Vercel:
- `GOOGLE_API_KEY` - Your rotated Gemini key
- `GEMINI_MODEL` - `gemini-2.5-flash`

### Cost
- **$0/month** - Everything on free tiers

---

## Troubleshooting

**Build fails:**
- Verify `npm run build` works locally in `frontend/`
- Check Vercel build logs

**API errors:**
- Check `GOOGLE_API_KEY` is set in Vercel dashboard
- Verify key works at https://aistudio.google.com

**PDF/Image analysis fails:**
- Check Vercel Function Logs
- May need to increase function timeout in Vercel settings

---

## Redeploy After Changes

```bash
git add .
git commit -m "Update"
git push
```

Vercel auto-deploys on every push to `main`!

---

**Remember to rotate your API key before deploying!** 🔒
