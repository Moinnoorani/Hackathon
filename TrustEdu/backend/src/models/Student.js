const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  semester: Number,
  marks: Number,
  attendance: Number,
  quizScore: Number,
  assignmentScore: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
