@echo off
echo Starting TrustEdu Backend Server...
echo.

REM Check if .env exists
if not exist .env (
    echo Creating .env file...
    echo PORT=5000 > .env
    echo MONGO_URI=mongodb://localhost:27017/trustedu >> .env
    echo OPENAI_API_KEY=optional >> .env
)

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting server on http://localhost:5000
echo.
call npm start
