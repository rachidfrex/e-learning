import pool from '../config/database';

export interface Lesson {
  id?: number;
  course_id: number;
  title: string;
  content?: string;
  transcript?: string;
  video_url?: string;
  order_number: number;
  duration_minutes?: number;
  created_at?: Date;
  updated_at?: Date;
}

export const LessonModel = {
  async create(lesson: Lesson): Promise<Lesson> {
    const result = await pool.query(
      `INSERT INTO lessons (course_id, title, content, transcript, video_url, order_number, duration_minutes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        lesson.course_id,
        lesson.title,
        lesson.content,
        lesson.transcript,
        lesson.video_url,
        lesson.order_number,
        lesson.duration_minutes,
      ]
    );
    return result.rows[0];
  },

  async findByCourseId(courseId: number): Promise<Lesson[]> {
    const result = await pool.query(
      'SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_number ASC',
      [courseId]
    );
    return result.rows;
  },

  async findById(id: number): Promise<Lesson | null> {
    const result = await pool.query('SELECT * FROM lessons WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async update(id: number, lesson: Partial<Lesson>): Promise<Lesson | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(lesson).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    const result = await pool.query(
      `UPDATE lessons SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING *`,
      values
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM lessons WHERE id = $1', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  },
};
