import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ProgressModel } from '../models/Progress';

export const getUserDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const progress = await ProgressModel.getUserProgress(req.user.id);
    res.json({ progress });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

export const getCourseProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const progress = await ProgressModel.getCourseProgress(req.user.id, parseInt(courseId));
    res.json({ progress });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({ error: 'Failed to fetch course progress' });
  }
};
