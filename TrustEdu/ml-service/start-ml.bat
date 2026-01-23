@echo off
echo Starting TrustEdu ML Service...
echo.

REM Train model if model.pkl doesn't exist
if not exist model.pkl (
    echo Training ML model (first time setup)...
    python train_model.py
    echo.
)

echo Starting Django server on http://127.0.0.1:8000
echo.
python manage.py runserver 8000
