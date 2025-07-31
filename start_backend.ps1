# PowerShell script to start Django backend with keep-alive functionality
param(
    [switch]$Production,
    [switch]$Development,
    [int]$Port = 8000
)

Write-Host "🚀 Django E-Commerce Backend Starter" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Set environment variables
if ($Production) {
    $env:DJANGO_ENV = "production"
    Write-Host "📦 Running in PRODUCTION mode" -ForegroundColor Yellow
} else {
    $env:DJANGO_ENV = "development"
    Write-Host "🔧 Running in DEVELOPMENT mode" -ForegroundColor Cyan
}

# Check if virtual environment exists
if (Test-Path "env\Scripts\activate.ps1") {
    Write-Host "🐍 Activating virtual environment..." -ForegroundColor Blue
    & "env\Scripts\activate.ps1"
} elseif (Test-Path "env\bin\activate") {
    Write-Host "🐍 Activating virtual environment (Unix-style)..." -ForegroundColor Blue
    & "env\bin\activate"
} else {
    Write-Host "⚠️ Virtual environment not found. Creating one..." -ForegroundColor Yellow
    python -m venv env
    & "env\Scripts\activate.ps1"
}

# Install requirements
Write-Host "📦 Installing/updating dependencies..." -ForegroundColor Blue
pip install -r requirements.txt

# Add psutil for system monitoring if not present
pip install psutil requests

# Run database migrations
Write-Host "🗄️ Running database migrations..." -ForegroundColor Blue
python manage.py makemigrations
python manage.py migrate

# Collect static files if in production
if ($Production) {
    Write-Host "📁 Collecting static files..." -ForegroundColor Blue
    python manage.py collectstatic --noinput
}

# Start the enhanced backend server
Write-Host "🌟 Starting enhanced Django backend server..." -ForegroundColor Green
Write-Host "🔗 Server will be available at: http://localhost:$Port" -ForegroundColor Cyan
Write-Host "💊 Health check: http://localhost:$Port/api/health/" -ForegroundColor Cyan
Write-Host "📊 Status check: http://localhost:$Port/api/status/" -ForegroundColor Cyan
Write-Host "💗 Keep-alive: http://localhost:$Port/api/keep-alive/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host "=================================" -ForegroundColor Green

# Run the enhanced startup script
try {
    python start_backend.py
} catch {
    Write-Host "❌ Error starting server: $_" -ForegroundColor Red
    exit 1
}
