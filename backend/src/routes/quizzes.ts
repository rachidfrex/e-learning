import { Router } from 'express';
import {
  getQuizzesByCourse,
  getQuizById,
  createQuiz,
  addQuestion,
  submitQuizAttempt,
  getQuizAttempts,
} from '../controllers/quizController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/course/:courseId', authenticateToken, getQuizzesByCourse);
router.get('/:id', authenticateToken, getQuizById);
router.post('/', authenticateToken, createQuiz);
router.post('/questions', authenticateToken, addQuestion);
router.post('/:id/attempt', authenticateToken, submitQuizAttempt);
router.get('/:id/attempts', authenticateToken, getQuizAttempts);

export default router;
