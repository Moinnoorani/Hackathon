const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

router.get('/:studentId', auditController.getStudentLogs);

module.exports = router;
