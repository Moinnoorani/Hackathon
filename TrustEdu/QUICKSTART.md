# Quick Start Instructions

## 🚀 Start All Services (3 Steps)

### Step 1: Start Backend
Open a **NEW terminal** and run:
```bash
cd d:\Hackathon\TrustEdu\backend
.\start-backend.bat
```
✅ Should show: `🚀 Backend running on http://localhost:5000`

### Step 2: Start ML Service  
Open a **SECOND terminal** and run:
```bash
cd d:\Hackathon\TrustEdu\ml-service
.\start-ml.bat
```
✅ Should show: `Starting development server at http://127.0.0.1:8000/`

### Step 3: Frontend (Already Running)
✅ Frontend already running at `http://localhost:3000`

---

## ⚠️ Important: MongoDB

**Option A: Skip MongoDB (Quick Demo)**
The app will work without MongoDB, blockchain just won't persist.

**Option B: Use MongoDB (Full Features)**
1. Sign up for **free** MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register
2. Create a **free cluster** (M0)
3. Get your **connection string**
4. Add to `backend\.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/trustedu
   ```

---

## 🧪 Test the App

Once all 3 services are running:

1. Go to: http://localhost:3000/dashboard
2. Enter test data:
   - **Student ID**: STU-2024-001
   - **Semester**: 5
   - **Marks**: 75
   - **Attendance**: 85
   - **Quiz Score**: 80
   - **Assignment Score**: 78
3. Click **"Get AI Prediction"**
4. ✅ Should see prediction + blockchain verification!

---

## 🔍 Troubleshooting

**"Failed to create prediction"**
- Make sure Step 1 (Backend) and Step 2 (ML Service) are running
- Check terminal outputs for errors
- Backend must be on port 5000
- ML service must be on port 8000

**"MongoDB connection error"**
- If you see this, the app will still work!
- Predictions will work, just won't save to database
- For demo purposes, this is OK

---

## 📍 Service Status Check

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:3000 | ✅ Running |
| Backend | http://localhost:5000 | ⏳ Start with Step 1 |
| ML Service | http://127.0.0.1:8000 | ⏳ Start with Step 2 |

**Next**: Open 2 terminals and run Steps 1 & 2! 🚀
