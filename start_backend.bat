@echo off
REM Batch script to start Django backend with keep-alive functionality

echo.
echo ================================
echo  Django E-Commerce Backend 
echo ================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Activate virtual environment if it exists
if exist "env\Scripts\activate.bat" (
    echo 🐍 Activating virtual environment...
    call env\Scripts\activate.bat
) else (
    echo ⚠️ Virtual environment not found. Creating one...
    python -m venv env
    call env\Scripts\activate.bat
)

REM Install/upgrade dependencies
echo 📦 Installing dependencies...
pip install -r requirements.txt
pip install psutil requests

REM Run migrations
echo 🗄️ Running database migrations...
python manage.py makemigrations
python manage.py migrate

REM Start the server
echo.
echo 🚀 Starting Django backend server...
echo 🔗 Server: http://localhost:8000
echo 💊 Health: http://localhost:8000/api/health/
echo 📊 Status: http://localhost:8000/api/status/
echo.
echo Press Ctrl+C to stop the server
echo ================================
echo.

python start_backend.py

pause
