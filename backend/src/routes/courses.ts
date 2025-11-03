import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getEnrolledCourses,
} from '../controllers/courseController';
import { authenticateToken, optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, getAllCourses);
router.get('/enrolled', authenticateToken, getEnrolledCourses);
router.get('/:id', optionalAuth, getCourseById);
router.post('/', authenticateToken, createCourse);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);
router.post('/:id/enroll', authenticateToken, enrollInCourse);

export default router;
