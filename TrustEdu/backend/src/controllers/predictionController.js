const axios = require("axios");

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

    // Create student and prediction objects (in-memory, no DB)
    const student = {
      studentId,
      semester,
      marks,
      attendance,
      quizScore,
      assignmentScore,
      createdAt: new Date()
    };

    const prediction = {
      studentId,
      semester,
      predictedGrade: predictionResult.predictedGrade,
      riskLevel: predictionResult.riskLevel,
      confidence: predictionResult.confidence,
      createdAt: new Date()
    };

    // Create blockchain record (mock for demo without actual blockchain)
    const recordId = `${studentId}_SEM${semester}_${Date.now()}`;
    const blockchain = {
      recordId,
      txHash: `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      blockNumber: Math.floor(Math.random() * 1000000),
      timestamp: new Date()
    };

    console.log("🔗 Blockchain record created (mock):", blockchain.recordId);

    // Send response to frontend
    res.json({
      student,
      prediction,
      blockchain
    });

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
