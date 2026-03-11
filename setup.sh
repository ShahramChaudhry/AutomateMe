#!/bin/bash

echo "🛠️  Setting up AI Ops Auditor..."

echo ""
echo "1️⃣ Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your Google Gemini API key!"
    echo "    Get a free key at: https://ai.google.dev/"
fi

cd ..

echo ""
echo "2️⃣ Setting up frontend..."
cd frontend

echo "Installing Node dependencies..."
npm install

if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cp .env.example .env.local
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Get a free Google Gemini API key at: https://ai.google.dev/"
echo "2. Add your API key to backend/.env"
echo "3. Run ./start.sh to start both servers"
echo ""
echo "Or start them separately:"
echo "   Backend:  cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "   Frontend: cd frontend && npm run dev"
