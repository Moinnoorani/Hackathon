@echo off
echo Installing lucide-react...
call npm install lucide-react

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ lucide-react installed successfully!
    echo.
    echo Starting development server...
    call npm start
) else (
    echo.
    echo ✗ Installation failed. Please check the error above.
    pause
)
