import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { QuizModel, QuizAttempt } from '../models/Quiz';

export const getQuizzesByCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const quizzes = await QuizModel.findQuizzesByCourseId(parseInt(courseId));
    res.json({ quizzes });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await QuizModel.findQuizById(parseInt(id));
    
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = await QuizModel.findQuestionsByQuizId(parseInt(id));
    
    // Remove correct answers from questions for students
    const sanitizedQuestions = questions.map(q => ({
      id: q.id,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options,
      points: q.points,
      order_number: q.order_number,
    }));

    res.json({ quiz, questions: sanitizedQuestions });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const createQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const quiz = await QuizModel.createQuiz(req.body);
    res.status(201).json({ quiz });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

export const addQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const question = await QuizModel.createQuestion(req.body);
    res.status(201).json({ question });
  } catch (error) {
    console.error('Add question error:', error);
    res.status(500).json({ error: 'Failed to add question' });
  }
};

export const submitQuizAttempt = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    const quiz = await QuizModel.findQuizById(parseInt(id));
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = await QuizModel.findQuestionsByQuizId(parseInt(id));
    
    // Calculate score
    let score = 0;
    let totalPoints = 0;
    const results: any = {};

    questions.forEach(question => {
      totalPoints += question.points || 1;
      const userAnswer = answers[question.id!];
      const isCorrect = userAnswer === question.correct_answer;
      
      if (isCorrect) {
        score += question.points || 1;
      }
      
      results[question.id!] = {
        userAnswer,
        correctAnswer: question.correct_answer,
        isCorrect,
        points: isCorrect ? question.points : 0,
      };
    });

    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
    const passed = percentage >= (quiz.passing_score || 70);

    const attempt: QuizAttempt = {
      quiz_id: parseInt(id),
      user_id: req.user.id,
      score,
      total_points: totalPoints,
      answers: results,
      passed,
    };

    const savedAttempt = await QuizModel.submitAttempt(attempt);

    res.json({
      attempt: savedAttempt,
      score,
      totalPoints,
      percentage,
      passed,
      results,
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

export const getQuizAttempts = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const attempts = await QuizModel.getUserAttempts(req.user.id, parseInt(id));
    res.json({ attempts });
  } catch (error) {
    console.error('Get attempts error:', error);
    res.status(500).json({ error: 'Failed to fetch attempts' });
  }
};
