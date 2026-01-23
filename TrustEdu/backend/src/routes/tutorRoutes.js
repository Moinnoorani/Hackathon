const express = require("express");
const router = express.Router();
const { chatWithTutor } = require("../controllers/tutorController");

router.post("/tutor/chat", chatWithTutor);

module.exports = router;
