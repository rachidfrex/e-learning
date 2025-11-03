import pool from '../config/database';

export interface Course {
  id?: number;
  title: string;
  description?: string;
  instructor_id?: number;
  thumbnail_url?: string;
  duration_minutes?: number;
  level?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const CourseModel = {
  async create(course: Course): Promise<Course> {
    const result = await pool.query(
      `INSERT INTO courses (title, description, instructor_id, thumbnail_url, duration_minutes, level) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        course.title,
        course.description,
        course.instructor_id,
        course.thumbnail_url,
        course.duration_minutes,
        course.level,
      ]
    );
    return result.rows[0];
  },

  async findAll(): Promise<Course[]> {
    const result = await pool.query(`
      SELECT c.*, u.name as instructor_name 
      FROM courses c 
      LEFT JOIN users u ON c.instructor_id = u.id 
      ORDER BY c.created_at DESC
    `);
    return result.rows;
  },

  async findById(id: number): Promise<Course | null> {
    const result = await pool.query(
      `SELECT c.*, u.name as instructor_name 
       FROM courses c 
       LEFT JOIN users u ON c.instructor_id = u.id 
       WHERE c.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async update(id: number, course: Partial<Course>): Promise<Course | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(course).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    const result = await pool.query(
      `UPDATE courses SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING *`,
      values
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM courses WHERE id = $1', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  },

  async enroll(userId: number, courseId: number): Promise<void> {
    await pool.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, courseId]
    );
  },

  async getEnrolledCourses(userId: number): Promise<Course[]> {
    const result = await pool.query(
      `SELECT c.*, u.name as instructor_name 
       FROM courses c 
       INNER JOIN enrollments e ON c.id = e.course_id 
       LEFT JOIN users u ON c.instructor_id = u.id 
       WHERE e.user_id = $1 
       ORDER BY e.enrolled_at DESC`,
      [userId]
    );
    return result.rows;
  },
};
