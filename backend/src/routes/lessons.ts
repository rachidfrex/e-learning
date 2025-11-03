import { Router } from 'express';
import {
  getCourseLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  markLessonComplete,
} from '../controllers/lessonController';
import { authenticateToken, optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/course/:courseId', optionalAuth, getCourseLessons);
router.get('/:id', optionalAuth, getLessonById);
router.post('/', authenticateToken, createLesson);
router.put('/:id', authenticateToken, updateLesson);
router.delete('/:id', authenticateToken, deleteLesson);
router.post('/:id/complete', authenticateToken, markLessonComplete);

export default router;
