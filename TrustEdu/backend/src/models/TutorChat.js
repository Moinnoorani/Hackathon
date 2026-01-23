const mongoose = require("mongoose");

const tutorChatSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  question: String,
  answer: String,
  type: { type: String, enum: ["ACADEMIC", "GENERAL"] },
  txHash: String,
  blockNumber: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TutorChat", tutorChatSchema);
