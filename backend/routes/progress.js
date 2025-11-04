const express = require('express');
const router = express.Router();
const {
  getProgress,
  markLessonComplete,
  submitQuizAttempt,
  getAllProgress
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllProgress);
router.get('/:courseId', protect, getProgress);
router.post('/:courseId/lesson/:lessonId', protect, markLessonComplete);
router.post('/:courseId/quiz/:lessonId', protect, submitQuizAttempt);

module.exports = router;
