const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  recordId: { type: String, required: true, unique: true },
  studentId: String,
  dataHash: String,
  txHash: String,
  blockNumber: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
