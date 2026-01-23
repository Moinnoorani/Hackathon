@echo off
echo ========================================
echo   TrustEdu - Starting All Services
echo ========================================
echo.

echo [1/3] Starting Backend Server...
start "TrustEdu Backend" cmd /k "cd /d %~dp0backend && npm start"
timeout /t 3 /nobreak >nul

echo [2/3] Starting ML Service...
start "TrustEdu ML Service" cmd /k "cd /d %~dp0ml-service && python manage.py runserver 8000"
timeout /t 3 /nobreak >nul

echo [3/3] Frontend already running on port 3000
echo.
echo ========================================
echo   All services started!
echo ========================================
echo.
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:5000
echo   ML Service: http://127.0.0.1:8000
echo.
echo Press any key to stop all services...
pause >nul

echo.
echo Stopping services...
taskkill /FI "WindowTitle eq TrustEdu Backend*" /T /F >nul 2>&1
taskkill /FI "WindowTitle eq TrustEdu ML Service*" /T /F >nul 2>&1
echo Services stopped.
