import pool from '../config/database';

export interface Progress {
  id?: number;
  user_id: number;
  course_id: number;
  lesson_id?: number;
  completed: boolean;
  progress_percentage: number;
  last_accessed_at?: Date;
  completed_at?: Date;
}

export const ProgressModel = {
  async updateProgress(progress: Progress): Promise<Progress> {
    const result = await pool.query(
      `INSERT INTO user_progress (user_id, course_id, lesson_id, completed, progress_percentage, last_accessed_at, completed_at) 
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6) 
       ON CONFLICT (user_id, course_id, lesson_id) 
       DO UPDATE SET 
         completed = $4, 
         progress_percentage = $5, 
         last_accessed_at = CURRENT_TIMESTAMP,
         completed_at = $6
       RETURNING *`,
      [
        progress.user_id,
        progress.course_id,
        progress.lesson_id,
        progress.completed,
        progress.progress_percentage,
        progress.completed ? new Date() : null,
      ]
    );
    return result.rows[0];
  },

  async getCourseProgress(userId: number, courseId: number): Promise<Progress[]> {
    const result = await pool.query(
      'SELECT * FROM user_progress WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );
    return result.rows;
  },

  async getUserProgress(userId: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT 
         c.id as course_id,
         c.title as course_title,
         COUNT(DISTINCT l.id) as total_lessons,
         COUNT(DISTINCT CASE WHEN up.completed = true THEN up.lesson_id END) as completed_lessons,
         COALESCE(AVG(up.progress_percentage), 0) as overall_progress
       FROM courses c
       INNER JOIN enrollments e ON c.id = e.course_id
       LEFT JOIN lessons l ON c.id = l.course_id
       LEFT JOIN user_progress up ON c.id = up.course_id AND up.user_id = e.user_id
       WHERE e.user_id = $1
       GROUP BY c.id, c.title`,
      [userId]
    );
    return result.rows;
  },
};
