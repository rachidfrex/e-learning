import api from './api';

export const getProgress = async (courseId) => {
  const response = await api.get(`/progress/${courseId}`);
  return response.data;
};

export const getAllProgress = async () => {
  const response = await api.get('/progress');
  return response.data;
};

export const markLessonComplete = async (courseId, lessonId) => {
  const response = await api.post(`/progress/${courseId}/lesson/${lessonId}`);
  return response.data;
};

export const submitQuizAttempt = async (courseId, lessonId, score, totalQuestions) => {
  const response = await api.post(`/progress/${courseId}/quiz/${lessonId}`, {
    score,
    totalQuestions
  });
  return response.data;
};
