# ⚠️ SECURITY: Rotate Your API Key

## What Happened

Your Google Gemini API key was accidentally included in documentation files. If you've already pushed to GitHub, the key may be exposed.

## Immediate Action Required

### Step 1: Delete Exposed Key (1 minute)

1. Visit: **https://aistudio.google.com/app/apikey**
2. Find the exposed API key in your list
3. Click the trash icon to **delete it**

### Step 2: Create New Key (1 minute)

1. On the same page, click **"Create API Key"**
2. Select your project (or create new)
3. Copy the NEW key (starts with `AIza...`)

### Step 3: Update Local Environment (30 seconds)

Edit `backend/.env`:
```bash
nano backend/.env
```

Replace with your NEW key:
```
GOOGLE_API_KEY=<your-new-key-here>
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:3000
```

Also update `frontend/.env.local`:
```
BACKEND_URL=http://localhost:8000
```

### Step 4: Test Locally

```bash
./start.sh
```

Visit `http://localhost:3000` and verify it works.

### Step 5: Clean Git History (If Already Pushed)

If you've already pushed to GitHub:

```bash
# Remove sensitive files from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (THIS REWRITES HISTORY)
git push origin --force --all

# Or simpler: Delete the repo and create a new one
```

**OR just delete the GitHub repo and create a fresh one.**

---

## ✅ Security Best Practices

### What's Already Protected

These files are in `.gitignore` (won't be committed):
- ✅ `backend/.env` (your actual API key)
- ✅ `frontend/.env.local` (local config)
- ✅ `.env` (root level)

### What Was Fixed

Removed hardcoded keys from:
- ✅ `deploy-vercel.sh`
- ✅ `DEPLOY_NOW.md`
- ✅ `VERCEL_DEPLOY.md`
- ✅ `VERCEL_GITHUB_DEPLOY.md`

### Going Forward

**NEVER include API keys in:**
- Documentation files (*.md)
- Scripts (*.sh)
- Code files (*.py, *.ts)
- Config files that are committed

**ALWAYS use:**
- `.env` files (in .gitignore)
- Environment variables in hosting platforms
- Secrets management (Railway, Vercel, etc.)

---

## Deployment With New Key

When deploying:

**Railway:**
- Add `GOOGLE_API_KEY` in dashboard (not in code)
- Copy/paste new key there

**Vercel:**
- Add `GOOGLE_API_KEY` in dashboard (not in code)
- Add to Environment Variables section

**Never commit the actual key to git!**

---

## Verification

After fixing:

```bash
# Check no keys in tracked files
git grep "AIza" -- ":(exclude).env*"

# Should return nothing or only placeholders like:
# GOOGLE_API_KEY=<your-key-here>
```

---

## Quick Recovery Checklist

- [ ] Old API key deleted at aistudio.google.com
- [ ] New API key created
- [ ] New key added to `backend/.env`
- [ ] App tested locally and works
- [ ] Documentation cleaned (placeholders only)
- [ ] Ready to push to GitHub safely

---

## Questions?

The key in `backend/.env` is safe because:
- It's in `.gitignore`
- Won't be committed to git
- Only exists locally

You're good to continue once you rotate the key!

---

**Next step**: Rotate your API key, then push to GitHub and deploy! 🔒
