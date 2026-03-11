#!/bin/bash

echo "🔍 Verifying AI Ops Auditor setup..."
echo ""

# Check Python
if command -v python3 &> /dev/null; then
    echo "✅ Python installed: $(python3 --version)"
else
    echo "❌ Python not found. Please install Python 3.10+"
    exit 1
fi

# Check Node
if command -v node &> /dev/null; then
    echo "✅ Node installed: $(node --version)"
else
    echo "❌ Node not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm installed: $(npm --version)"
else
    echo "❌ npm not found. Please install npm"
    exit 1
fi

echo ""
echo "📁 Checking project structure..."

# Check backend files
if [ -f "backend/main.py" ]; then
    echo "✅ Backend files present"
else
    echo "❌ Backend files missing"
    exit 1
fi

# Check frontend files
if [ -f "frontend/package.json" ]; then
    echo "✅ Frontend files present"
else
    echo "❌ Frontend files missing"
    exit 1
fi

# Check if venv exists
if [ -d "backend/venv" ]; then
    echo "✅ Virtual environment created"
else
    echo "⚠️  Virtual environment not found. Run ./setup.sh first"
fi

# Check if .env exists
if [ -f "backend/.env" ]; then
    echo "✅ Backend .env configured"
    if grep -q "your_google_api_key_here" backend/.env; then
        echo "⚠️  Google Gemini API key not set in backend/.env"
        echo "    Get free key at: https://ai.google.dev/"
    else
        echo "✅ Google Gemini API key appears to be set"
    fi
else
    echo "⚠️  Backend .env not found. Run ./setup.sh first"
fi

# Check if node_modules exists
if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed. Run ./setup.sh first"
fi

echo ""
echo "📊 Summary:"
echo ""
echo "If you see warnings above:"
echo "  1. Run ./setup.sh to complete installation"
echo "  2. Get free Gemini API key at: https://ai.google.dev/"
echo "  3. Edit backend/.env and add your API key"
echo "  4. Run ./start.sh to start the app"
echo ""
echo "If everything is ✅:"
echo "  Run ./start.sh to start the app!"
