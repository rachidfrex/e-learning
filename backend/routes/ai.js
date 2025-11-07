const express = require('express');
const router = express.Router();
const { getAIResponse, getLessonHelp } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/query', protect, getAIResponse);
router.post('/lesson-help/:courseId/:lessonId', protect, getLessonHelp);

module.exports = router;
