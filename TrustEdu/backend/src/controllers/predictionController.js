const axios = require("axios");
const Prediction = require("../models/Prediction");
const Student = require("../models/Student");
const blockchainService = require("../services/blockchainService");

exports.createPrediction = async (req, res) => {
  try {
    const {
      studentId,
      semester,
      marks,
      attendance,
      quizScore,
      assignmentScore
    } = req.body;

    if (!studentId || marks === undefined || attendance === undefined || quizScore === undefined || assignmentScore === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Range Validation
    if (marks < 0 || marks > 100) return res.status(400).json({ error: "Marks must be between 0 and 100" });
    if (attendance < 0 || attendance > 100) return res.status(400).json({ error: "Attendance must be between 0 and 100" });
    if (quizScore < 0 || quizScore > 100) return res.status(400).json({ error: "Quiz Score must be between 0 and 100" });
    if (assignmentScore < 0 || assignmentScore > 100) return res.status(400).json({ error: "Assignment Score must be between 0 and 100" });

    console.log("📊 Prediction request for student:", studentId);

    // Call Django ML API
    const mlResponse = await axios.post("http://127.0.0.1:8000/predict/", {
      marks,
      attendance,
      quizScore,
      assignmentScore
    }, { timeout: 5000 });

    const predictionResult = mlResponse.data;
    console.log("✅ ML prediction received:", predictionResult);

    // Create Real Blockchain Record
    const recordId = `${studentId}_SEM${semester}_${Date.now()}`;
    let blockchain = {};

    try {
      const log = await blockchainService.storeHashOnBlockchain(recordId, studentId, predictionResult);
      blockchain = {
        recordId,
        txHash: log.txHash,
        blockNumber: log.blockNumber,
        timestamp: log.createdAt
      };
      console.log("🔗 Real Blockchain TX Confirmed:", blockchain.txHash);
    } catch (bcError) {
      console.error("⚠️ Blockchain Transaction Failed:", bcError.message);
      blockchain = { error: "Transaction failed", details: bcError.message };
    }

    // Save to Database (Graceful Fallback)
    try {
      // 1. Save specific Prediction Event
      const newPrediction = new Prediction({
        studentId,
        semester,
        marks,
        attendance,
        quizScore,
        assignmentScore,
        predictedGrade: predictionResult.predictedGrade,
        riskLevel: predictionResult.riskLevel,
        confidence: predictionResult.confidence,
        blockchain
      });
      await newPrediction.save();
      console.log("💾 Prediction saved to MongoDB");

      // 2. Update/Upsert Student Record (Keep latest stats)
      await Student.findOneAndUpdate(
        { studentId: studentId }, // Find by ID
        {
          // Update with latest data
          semester,
          marks,
          attendance,
          quizScore,
          assignmentScore
        },
        { upsert: true, new: true, setDefaultsOnInsert: true } // Create if not exists
      );
      console.log("👤 Student profile updated/created");

      // Send response to frontend (Success with DB)
      res.json({
        student: newPrediction,
        prediction: {
          predictedGrade: newPrediction.predictedGrade,
          riskLevel: newPrediction.riskLevel,
          confidence: newPrediction.confidence
        },
        blockchain
      });

    } catch (dbError) {
      console.warn("⚠️ Database save failed (running offline):", dbError.message);

      // Fallback response (Success without DB)
      res.json({
        student: { // Mock student object for frontend compatibility
          studentId, semester, marks, attendance, quizScore, assignmentScore
        },
        prediction: {
          predictedGrade: predictionResult.predictedGrade,
          riskLevel: predictionResult.riskLevel,
          confidence: predictionResult.confidence
        },
        blockchain
      });
    }

  } catch (err) {
    console.error("❌ Prediction error:", err.message);

    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: "ML service unavailable. Please ensure Django server is running on port 8000."
      });
    }

    res.status(500).json({
      error: "Prediction failed. " + (err.response?.data?.error || err.message)
    });
  }
};
