# MANUAL BACKEND STARTUP - SIMPLE STEPS

## Backend Server

### Step 1: Install Dependencies (One-time)
```bash
cd d:\Hackathon\TrustEdu\backend
npm install
```

### Step 2: Create .env File
Create a file named `.env` in the `backend` folder with this content:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/trustedu
```

### Step 3: Start Server
```bash
npm start
```

Should see: `✅ MongoDB connected` or `❌ MongoDB connection error` (that's OK!)
Then: `🚀 Backend running on http://localhost:5000`

---

## ML Service

### Step 1: Train Model (One-time)
```bash
cd d:\Hackathon\TrustEdu\ml-service
python train_model.py
```

Should see: `✅ Model trained and saved as model.pkl`

### Step 2: Start Django Server
```bash
python manage.py runserver 8000
```

Should see: `Starting development server at http://127.0.0.1:8000/`

---

## Quick Test

Visit in browser: http://localhost:5000/api
Should NOT see "Cannot GET /api" error anymore
