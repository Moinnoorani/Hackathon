const AuditLog = require('../models/AuditLog');

const getStudentLogs = async (req, res) => {
    try {
        const { studentId } = req.params;

        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const limit = parseInt(req.query.limit) || 50;

        const logs = await AuditLog.find({ studentId })
            .sort({ createdAt: -1 }) // Newest first
            .limit(limit);

        res.json(logs);
    } catch (err) {
        console.error("Audit Fetch Error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getStudentLogs
};
