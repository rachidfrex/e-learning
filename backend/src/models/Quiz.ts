import pool from '../config/database';

export interface Question {
  id?: number;
  quiz_id: number;
  question_text: string;
  question_type?: string;
  options: any;
  correct_answer: string;
  points?: number;
  order_number: number;
  created_at?: Date;
}

export interface Quiz {
  id?: number;
  course_id?: number;
  lesson_id?: number;
  title: string;
  description?: string;
  passing_score?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface QuizAttempt {
  id?: number;
  quiz_id: number;
  user_id: number;
  score: number;
  total_points: number;
  answers: any;
  passed: boolean;
  started_at?: Date;
  completed_at?: Date;
}

export const QuizModel = {
  async createQuiz(quiz: Quiz): Promise<Quiz> {
    const result = await pool.query(
      `INSERT INTO quizzes (course_id, lesson_id, title, description, passing_score) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [quiz.course_id, quiz.lesson_id, quiz.title, quiz.description, quiz.passing_score || 70]
    );
    return result.rows[0];
  },

  async createQuestion(question: Question): Promise<Question> {
    const result = await pool.query(
      `INSERT INTO questions (quiz_id, question_text, question_type, options, correct_answer, points, order_number) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        question.quiz_id,
        question.question_text,
        question.question_type || 'multiple_choice',
        JSON.stringify(question.options),
        question.correct_answer,
        question.points || 1,
        question.order_number,
      ]
    );
    return result.rows[0];
  },

  async findQuizById(id: number): Promise<Quiz | null> {
    const result = await pool.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async findQuizzesByCourseId(courseId: number): Promise<Quiz[]> {
    const result = await pool.query('SELECT * FROM quizzes WHERE course_id = $1', [courseId]);
    return result.rows;
  },

  async findQuestionsByQuizId(quizId: number): Promise<Question[]> {
    const result = await pool.query(
      'SELECT * FROM questions WHERE quiz_id = $1 ORDER BY order_number ASC',
      [quizId]
    );
    return result.rows;
  },

  async submitAttempt(attempt: QuizAttempt): Promise<QuizAttempt> {
    const result = await pool.query(
      `INSERT INTO quiz_attempts (quiz_id, user_id, score, total_points, answers, passed) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [attempt.quiz_id, attempt.user_id, attempt.score, attempt.total_points, JSON.stringify(attempt.answers), attempt.passed]
    );
    return result.rows[0];
  },

  async getUserAttempts(userId: number, quizId: number): Promise<QuizAttempt[]> {
    const result = await pool.query(
      'SELECT * FROM quiz_attempts WHERE user_id = $1 AND quiz_id = $2 ORDER BY completed_at DESC',
      [userId, quizId]
    );
    return result.rows;
  },
};
