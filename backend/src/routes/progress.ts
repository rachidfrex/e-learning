import { Router } from 'express';
import { getUserDashboard, getCourseProgress } from '../controllers/progressController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/dashboard', authenticateToken, getUserDashboard);
router.get('/course/:courseId', authenticateToken, getCourseProgress);

export default router;
