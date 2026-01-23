const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  semester: Number,
  marks: Number,
  attendance: Number,
  quizScore: Number,
  assignmentScore: Number,
  // Prediction inputs
  predictedGrade: String,
  riskLevel: String,
  confidence: Number,
  // Blockchain Record
  blockchain: {
    recordId: String,
    txHash: String,
    blockNumber: Number,
    timestamp: Date
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prediction", predictionSchema);
