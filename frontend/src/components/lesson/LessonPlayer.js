import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse } from '../../services/courseService';
import { markLessonComplete, submitQuizAttempt } from '../../services/progressService';
import { getAIResponse } from '../../services/aiService';
import './LessonPlayer.css';

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await getCourse(courseId);
        setCourse(data.data);
        const lesson = data.data.lessons.find(l => l._id === lessonId);
        setCurrentLesson(lesson);
        setLoading(false);
      } catch (error) {
        console.error('Error loading course:', error);
        setLoading(false);
      }
    };
    loadCourse();
  }, [courseId, lessonId]);

  const handleMarkComplete = async () => {
    try {
      await markLessonComplete(courseId, lessonId);
      alert('Lesson marked as complete!');
      
      // Navigate to next lesson if available
      const currentIndex = course.lessons.findIndex(l => l._id === lessonId);
      if (currentIndex < course.lessons.length - 1) {
        const nextLesson = course.lessons[currentIndex + 1];
        navigate(`/lesson/${courseId}/${nextLesson._id}`);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const handleQuizSubmit = async () => {
    let score = 0;
    currentLesson.quiz.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        score++;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);

    try {
      await submitQuizAttempt(
        courseId,
        lessonId,
        score,
        currentLesson.quiz.questions.length
      );
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;

    try {
      const response = await getAIResponse(aiQuestion, currentLesson.content);
      setAiResponse(response.data);
      setAiQuestion('');
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading lesson...</div>;
  }

  if (!currentLesson) {
    return <div className="error">Lesson not found</div>;
  }

  return (
    <div className="lesson-player-container">
      <div className="lesson-sidebar">
        <h3>Course Content</h3>
        <div className="lesson-list">
          {course.lessons.map((lesson, index) => (
            <div
              key={lesson._id}
              className={`sidebar-lesson-item ${lesson._id === lessonId ? 'active' : ''}`}
              onClick={() => navigate(`/lesson/${courseId}/${lesson._id}`)}
            >
              <span className="lesson-index">{index + 1}</span>
              <span className="lesson-title">{lesson.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lesson-content">
        <h1>{currentLesson.title}</h1>

        <div className="lesson-body">
          <div className="content-section">
            <p>{currentLesson.content}</p>
          </div>

          {currentLesson.videoUrl && (
            <div className="video-section">
              <video controls width="100%">
                <source src={currentLesson.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {currentLesson.resources && currentLesson.resources.length > 0 && (
            <div className="resources-section">
              <h3>Resources</h3>
              <ul>
                {currentLesson.resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      {resource.title} ({resource.type})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentLesson.quiz && currentLesson.quiz.questions && currentLesson.quiz.questions.length > 0 && (
            <div className="quiz-section">
              <button onClick={() => setShowQuiz(!showQuiz)} className="btn btn-quiz">
                {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
              </button>

              {showQuiz && (
                <div className="quiz-content">
                  {currentLesson.quiz.questions.map((question, qIndex) => (
                    <div key={qIndex} className="quiz-question">
                      <h4>Question {qIndex + 1}: {question.question}</h4>
                      <div className="quiz-options">
                        {question.options.map((option, oIndex) => (
                          <label key={oIndex} className="quiz-option">
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={oIndex}
                              onChange={() => handleQuizAnswer(qIndex, oIndex)}
                              disabled={quizSubmitted}
                              checked={quizAnswers[qIndex] === oIndex}
                            />
                            <span>{option}</span>
                            {quizSubmitted && oIndex === question.correctAnswer && (
                              <span className="correct-badge">✓ Correct</span>
                            )}
                          </label>
                        ))}
                      </div>
                      {quizSubmitted && question.explanation && (
                        <div className="explanation">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  {!quizSubmitted && (
                    <button onClick={handleQuizSubmit} className="btn btn-submit">
                      Submit Quiz
                    </button>
                  )}

                  {quizSubmitted && (
                    <div className="quiz-results">
                      <h3>Your Score: {quizScore} / {currentLesson.quiz.questions.length}</h3>
                      <p>
                        {(quizScore / currentLesson.quiz.questions.length) * 100 >= 70
                          ? 'Great job! You passed!'
                          : 'Keep practicing!'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="ai-section">
            <h3>Ask AI Teacher</h3>
            <div className="ai-input-group">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask a question about this lesson..."
                onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
              />
              <button onClick={handleAskAI} className="btn btn-ai">
                Ask
              </button>
            </div>
            {aiResponse && (
              <div className="ai-response">
                <h4>AI Response:</h4>
                <p>{aiResponse.answer}</p>
                {aiResponse.suggestions && (
                  <div className="ai-suggestions">
                    <strong>Suggestions:</strong>
                    <ul>
                      {aiResponse.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lesson-actions">
            <button onClick={handleMarkComplete} className="btn btn-complete">
              Mark as Complete & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
