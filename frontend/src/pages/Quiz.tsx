import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI } from '../services/api';

interface Question {
  id: number;
  question_text: string;
  options: string[];
  points: number;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  passing_score: number;
  course_id?: number;
}

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await quizAPI.getById(parseInt(id!));
        setQuiz(response.data.quiz);
        setQuestions(response.data.questions);
      } catch (err) {
        console.error('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    try {
      const response = await quizAPI.submitAttempt(parseInt(id!), answers);
      setResult(response.data);
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit quiz');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading quiz...</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Quiz not found</div>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Quiz Results</h1>
            
            <div className={`text-center mb-8 p-6 rounded-lg ${
              result.passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <div className="text-6xl mb-4">
                {result.passed ? '✅' : '❌'}
              </div>
              <div className="text-2xl font-bold mb-2">
                {result.passed ? 'Congratulations!' : 'Keep Trying!'}
              </div>
              <div className="text-xl">
                Score: {result.score} / {result.totalPoints} ({result.percentage}%)
              </div>
              <div className="text-gray-600 mt-2">
                Passing Score: {quiz.passing_score}%
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {Object.entries(result.results).map(([questionId, data]: [string, any]) => {
                const question = questions.find(q => q.id === parseInt(questionId));
                return (
                  <div
                    key={questionId}
                    className={`p-4 rounded-lg ${
                      data.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="font-medium mb-2">{question?.question_text}</div>
                    <div className="text-sm">
                      <div>Your answer: {data.userAnswer}</div>
                      {!data.isCorrect && (
                        <div className="text-green-700">
                          Correct answer: {data.correctAnswer}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate(`/courses/${quiz.course_id}`)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Back to Course
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
          <p className="text-gray-600 mb-6">{quiz.description}</p>
          
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              📝 {questions.length} questions • Passing score: {quiz.passing_score}%
            </p>
          </div>

          <div className="space-y-8 mb-8">
            {questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-6">
                <h3 className="font-medium mb-4">
                  {index + 1}. {question.question_text}
                  <span className="text-sm text-gray-500 ml-2">
                    ({question.points} {question.points === 1 ? 'point' : 'points'})
                  </span>
                </h3>
                
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
