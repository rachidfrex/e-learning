import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { CourseModel } from '../models/Course';

export const getAllCourses = async (req: AuthRequest, res: Response) => {
  try {
    const courses = await CourseModel.findAll();
    res.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const getCourseById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(parseInt(id));
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

export const createCourse = async (req: AuthRequest, res: Response) => {
  try {
    const courseData = {
      ...req.body,
      instructor_id: req.user.id,
    };
    
    const course = await CourseModel.create(courseData);
    res.status(201).json({ course });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
};

export const updateCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.update(parseInt(id), req.body);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const success = await CourseModel.delete(parseInt(id));
    
    if (!success) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

export const enrollInCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await CourseModel.enroll(req.user.id, parseInt(id));
    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
};

export const getEnrolledCourses = async (req: AuthRequest, res: Response) => {
  try {
    const courses = await CourseModel.getEnrolledCourses(req.user.id);
    res.json({ courses });
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
};
