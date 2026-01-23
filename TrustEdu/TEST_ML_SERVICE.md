# Quick ML Service Test

Test if the ML service is responding:

## Test 1: Direct ML Service
Open a new terminal and run:

```bash
curl -X POST http://127.0.0.1:8000/predict/ -H "Content-Type: application/json" -d "{\"marks\": 75, \"attendance\": 85, \"quizScore\": 80, \"assignmentScore\": 78}"
```

**Expected output:**
```json
{"predictedGrade":"A","riskLevel":"Low","confidence":0.85}
```

## Test 2: Backend API
```bash
curl -X POST http://localhost:5000/api/predict -H "Content-Type: application/json" -d "{\"studentId\":\"TEST1\",\"semester\":5,\"marks\":75,\"attendance\":85,\"quizScore\":80,\"assignmentScore\":78}"
```

**Expected:** Full prediction with blockchain data

## If Tests Fail:

1. Check if ML service is running:
   - Visit: http://127.0.0.1:8000/predict/ in browser
   - Should see: "Only POST allowed" error (this is good!)

2. Check if backend is running:
   - Visit: http://localhost:5000 in browser
   - Should see: "Cannot GET /" (this is fine)

3. **Check browser console** (F12):
   - Network tab → Look for failed requests
   - Console tab → Look for CORS or network errors
   - Share the exact error message!

## Most Likely Issues:

❌ ML service not actually running on port 8000  
❌ CORS error (cross-origin blocking)  
❌ Model file missing (model.pkl not found)  
❌ Network timeout

**Please share the exact error from your browser console (F12 → Console tab)**
