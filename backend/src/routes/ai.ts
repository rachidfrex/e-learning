import { Router } from 'express';
import { askAITeacher, getChatHistory } from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/ask', authenticateToken, askAITeacher);
router.get('/history', authenticateToken, getChatHistory);

export default router;
