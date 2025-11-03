import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { LessonModel } from '../models/Lesson';
import { ProgressModel } from '../models/Progress';

export const getCourseLessons = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const lessons = await LessonModel.findByCourseId(parseInt(courseId));
    res.json({ lessons });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
};

export const getLessonById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await LessonModel.findById(parseInt(id));
    
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({ lesson });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
};

export const createLesson = async (req: AuthRequest, res: Response) => {
  try {
    const lesson = await LessonModel.create(req.body);
    res.status(201).json({ lesson });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
};

export const updateLesson = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await LessonModel.update(parseInt(id), req.body);
    
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({ lesson });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ error: 'Failed to update lesson' });
  }
};

export const deleteLesson = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const success = await LessonModel.delete(parseInt(id));
    
    if (!success) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ error: 'Failed to delete lesson' });
  }
};

export const markLessonComplete = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await LessonModel.findById(parseInt(id));
    
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    await ProgressModel.updateProgress({
      user_id: req.user.id,
      course_id: lesson.course_id,
      lesson_id: lesson.id,
      completed: true,
      progress_percentage: 100,
    });

    res.json({ message: 'Lesson marked as complete' });
  } catch (error) {
    console.error('Mark lesson complete error:', error);
    res.status(500).json({ error: 'Failed to mark lesson complete' });
  }
};
