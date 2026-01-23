const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  semester: Number,
  predictedGrade: String,
  riskLevel: String,
  confidence: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prediction", predictionSchema);
