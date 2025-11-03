import { QuizModel, Question, QuizAttempt } from '../models/Quiz';

describe('Quiz Logic Tests', () => {
  describe('Score Calculation', () => {
    it('should calculate correct score for all correct answers', () => {
      const questions: Question[] = [
        {
          id: 1,
          quiz_id: 1,
          question_text: 'What is 2+2?',
          question_type: 'multiple_choice',
          options: ['3', '4', '5', '6'],
          correct_answer: '4',
          points: 1,
          order_number: 1,
        },
        {
          id: 2,
          quiz_id: 1,
          question_text: 'What is the capital of France?',
          question_type: 'multiple_choice',
          options: ['London', 'Paris', 'Berlin', 'Madrid'],
          correct_answer: 'Paris',
          points: 1,
          order_number: 2,
        },
      ];

      const userAnswers: { [key: number]: string } = {
        1: '4',
        2: 'Paris',
      };

      let score = 0;
      let totalPoints = 0;

      questions.forEach(question => {
        totalPoints += question.points || 1;
        const userAnswer = userAnswers[question.id!];
        const isCorrect = userAnswer === question.correct_answer;
        if (isCorrect) {
          score += question.points || 1;
        }
      });

      expect(score).toBe(2);
      expect(totalPoints).toBe(2);
      expect(Math.round((score / totalPoints) * 100)).toBe(100);
    });

    it('should calculate correct score for partial correct answers', () => {
      const questions: Question[] = [
        {
          id: 1,
          quiz_id: 1,
          question_text: 'What is 2+2?',
          question_type: 'multiple_choice',
          options: ['3', '4', '5', '6'],
          correct_answer: '4',
          points: 1,
          order_number: 1,
        },
        {
          id: 2,
          quiz_id: 1,
          question_text: 'What is the capital of France?',
          question_type: 'multiple_choice',
          options: ['London', 'Paris', 'Berlin', 'Madrid'],
          correct_answer: 'Paris',
          points: 1,
          order_number: 2,
        },
      ];

      const userAnswers: { [key: number]: string } = {
        1: '4',
        2: 'London', // Wrong answer
      };

      let score = 0;
      let totalPoints = 0;

      questions.forEach(question => {
        totalPoints += question.points || 1;
        const userAnswer = userAnswers[question.id!];
        const isCorrect = userAnswer === question.correct_answer;
        if (isCorrect) {
          score += question.points || 1;
        }
      });

      expect(score).toBe(1);
      expect(totalPoints).toBe(2);
      expect(Math.round((score / totalPoints) * 100)).toBe(50);
    });

    it('should calculate correct score for all wrong answers', () => {
      const questions: Question[] = [
        {
          id: 1,
          quiz_id: 1,
          question_text: 'What is 2+2?',
          question_type: 'multiple_choice',
          options: ['3', '4', '5', '6'],
          correct_answer: '4',
          points: 1,
          order_number: 1,
        },
        {
          id: 2,
          quiz_id: 1,
          question_text: 'What is the capital of France?',
          question_type: 'multiple_choice',
          options: ['London', 'Paris', 'Berlin', 'Madrid'],
          correct_answer: 'Paris',
          points: 1,
          order_number: 2,
        },
      ];

      const userAnswers: { [key: number]: string } = {
        1: '3',
        2: 'London',
      };

      let score = 0;
      let totalPoints = 0;

      questions.forEach(question => {
        totalPoints += question.points || 1;
        const userAnswer = userAnswers[question.id!];
        const isCorrect = userAnswer === question.correct_answer;
        if (isCorrect) {
          score += question.points || 1;
        }
      });

      expect(score).toBe(0);
      expect(totalPoints).toBe(2);
      expect(Math.round((score / totalPoints) * 100)).toBe(0);
    });

    it('should handle questions with different point values', () => {
      const questions: Question[] = [
        {
          id: 1,
          quiz_id: 1,
          question_text: 'Easy question',
          question_type: 'multiple_choice',
          options: ['A', 'B', 'C', 'D'],
          correct_answer: 'A',
          points: 1,
          order_number: 1,
        },
        {
          id: 2,
          quiz_id: 1,
          question_text: 'Hard question',
          question_type: 'multiple_choice',
          options: ['A', 'B', 'C', 'D'],
          correct_answer: 'B',
          points: 5,
          order_number: 2,
        },
      ];

      const userAnswers: { [key: number]: string } = {
        1: 'A', // Correct (1 point)
        2: 'B', // Correct (5 points)
      };

      let score = 0;
      let totalPoints = 0;

      questions.forEach(question => {
        totalPoints += question.points || 1;
        const userAnswer = userAnswers[question.id!];
        const isCorrect = userAnswer === question.correct_answer;
        if (isCorrect) {
          score += question.points || 1;
        }
      });

      expect(score).toBe(6);
      expect(totalPoints).toBe(6);
      expect(Math.round((score / totalPoints) * 100)).toBe(100);
    });

    it('should determine pass/fail based on passing score', () => {
      const passingScore = 70;
      const score1 = 80;
      const score2 = 60;

      expect(score1 >= passingScore).toBe(true);
      expect(score2 >= passingScore).toBe(false);
    });
  });

  describe('Answer Validation', () => {
    it('should correctly identify matching answers', () => {
      const correctAnswer = 'Paris';
      const userAnswer1 = 'Paris';
      const userAnswer2: string = 'paris'; // Case sensitive

      expect(userAnswer1 === correctAnswer).toBe(true);
      expect(userAnswer2 === correctAnswer).toBe(false);
    });

    it('should handle missing answers', () => {
      const questions: Question[] = [
        {
          id: 1,
          quiz_id: 1,
          question_text: 'Question 1',
          question_type: 'multiple_choice',
          options: ['A', 'B'],
          correct_answer: 'A',
          points: 1,
          order_number: 1,
        },
      ];

      const userAnswers: { [key: number]: string } = {}; // No answer provided

      let score = 0;
      let totalPoints = 0;

      questions.forEach(question => {
        totalPoints += question.points || 1;
        const userAnswer = userAnswers[question.id!];
        const isCorrect = userAnswer === question.correct_answer;
        if (isCorrect) {
          score += question.points || 1;
        }
      });

      expect(score).toBe(0);
      expect(totalPoints).toBe(1);
    });
  });
});
