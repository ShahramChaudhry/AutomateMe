#!/bin/bash

echo "🚀 Deploying AutomateMe to Vercel..."
echo ""

# Check if git repo is initialized
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit - AutomateMe"
    echo "✅ Git repository initialized"
    echo ""
    echo "⚠️  Now push to GitHub:"
    echo "   1. Create a new repo on GitHub"
    echo "   2. Run: git remote add origin <your-repo-url>"
    echo "   3. Run: git push -u origin main"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🎯 Step 1: Deploy Backend to Railway"
echo "─────────────────────────────────────"
echo ""
echo "1. Visit: https://railway.app/"
echo "2. Click 'New Project' → 'Deploy from GitHub'"
echo "3. Select this repository"
echo "4. Select 'backend' folder"
echo "5. Add these environment variables:"
echo "   GOOGLE_API_KEY = <your-gemini-api-key>"
echo "   GEMINI_MODEL = gemini-2.5-flash"
echo "   FRONTEND_URL = (leave blank for now)"
echo ""
read -p "✓ Backend deployed? Copy your Railway URL and press Enter..."
read -p "📋 Paste your Railway backend URL: " BACKEND_URL
echo ""

echo "🎯 Step 2: Deploy Frontend to Vercel"
echo "─────────────────────────────────────"
echo ""
echo "Deploying frontend with backend URL: $BACKEND_URL"
echo ""

cd frontend

# Set environment variable
export NEXT_PUBLIC_API_URL=$BACKEND_URL

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Frontend deployed!"
echo ""
echo "🎯 Step 3: Update Backend CORS"
echo "─────────────────────────────────────"
echo ""
echo "Now update your Railway backend:"
echo "1. Go to Railway dashboard"
echo "2. Add/update environment variable:"
echo "   FRONTEND_URL = <your-vercel-url>"
echo "3. Backend will auto-restart"
echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Test your app at your Vercel URL"
