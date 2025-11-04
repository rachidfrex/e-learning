import api from './api';

export const getAIResponse = async (question, lessonContext) => {
  const response = await api.post('/ai/query', { question, lessonContext });
  return response.data;
};

export const getLessonHelp = async (courseId, lessonId, topic) => {
  const response = await api.post(`/ai/lesson-help/${courseId}/${lessonId}`, { topic });
  return response.data;
};
