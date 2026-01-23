# TrustEdu - Complete Startup Guide

## 🚀 Quick Start (Run All Services)

Your app needs **3 services** running simultaneously:
1. **Frontend** (React) - Already running ✅
2. **Backend** (Express + MongoDB)
3. **ML Service** (Django)

---

## Option 1: Automated Startup (Recommended)

### Windows PowerShell/CMD

Run this ONE command to start everything:

```bash
cd d:\Hackathon\TrustEdu
.\start-all-services.bat
```

---

## Option 2: Manual Startup (3 Terminals)

### Terminal 1: Backend Server

```bash
cd d:\Hackathon\TrustEdu\backend
npm install  # First time only
npm start
```

**Expected output:** `🚀 Backend running on http://localhost:5000`

### Terminal 2: ML Service

```bash
cd d:\Hackathon\TrustEdu\ml-service
python train_model.py  # First time only - trains the model
python manage.py runserver 8000
```

**Expected output:** `Starting development server at http://127.0.0.1:8000/`

### Terminal 3: Frontend (Already Running)

```bash
cd d:\Hackathon\TrustEdu\frontend
npm start
```

**Expected output:** `Compiled successfully! http://localhost:3000`

---

## ⚠️ Prerequisites

### 1. MongoDB

**Option A: MongoDB Atlas** (Cloud - Recommended)
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Add to `backend/.env`:
  ```
  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/trustedu
  ```

**Option B: Local MongoDB**
- Install: https://www.mongodb.com/try/download/community
- Start: `mongod --dbpath=C:\data\db`
- Use in `.env`:
  ```
  MONGO_URI=mongodb://localhost:27017/trustedu
  ```

### 2. Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_key_optional
```

Create `blockchain/.env`:
```env
PRIVATE_KEY=your_test_wallet_private_key
```

---

## 🧪 Testing the Flow

Once all services are running:

1. **Frontend:** http://localhost:3000
2. **Backend API:** http://localhost:5000
3. **ML Service:** http://127.0.0.1:8000

**Test Prediction:**
1. Go to http://localhost:3000/dashboard
2. Enter:
   - Student ID: STU-2024-001
   - Semester: 5
   - Marks: 75
   - Attendance: 85
   - Quiz Score: 80
   - Assignment Score: 78
3. Click "Get AI Prediction"
4. Should see prediction + blockchain verification!

---

## 🔧 Troubleshooting

### "Failed to create prediction"
- ✅ Backend running on port 5000?
- ✅ ML service running on port 8000?
- ✅ MongoDB connected?
- Check browser console (F12) for specific error

### "ML Service Error"
- Make sure you ran `python train_model.py` first
- Check `model.pkl` exists in `ml-service/`

### "Blockchain Error"
- For demo, blockchain errors are non-critical
- Backend will still work, just without on-chain storage

---

## 📝 Service Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 5000 | http://localhost:5000 |
| ML Service | 8000 | http://127.0.0.1:8000 |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

**Next:** I'll create automated startup scripts for you! 🚀
