import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Course API
export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id: number) => api.get(`/courses/${id}`),
  getEnrolled: () => api.get('/courses/enrolled'),
  enroll: (id: number) => api.post(`/courses/${id}/enroll`),
  create: (data: any) => api.post('/courses', data),
  update: (id: number, data: any) => api.put(`/courses/${id}`, data),
  delete: (id: number) => api.delete(`/courses/${id}`),
};

// Lesson API
export const lessonAPI = {
  getByCourseId: (courseId: number) => api.get(`/lessons/course/${courseId}`),
  getById: (id: number) => api.get(`/lessons/${id}`),
  markComplete: (id: number) => api.post(`/lessons/${id}/complete`),
  create: (data: any) => api.post('/lessons', data),
  update: (id: number, data: any) => api.put(`/lessons/${id}`, data),
  delete: (id: number) => api.delete(`/lessons/${id}`),
};

// Quiz API
export const quizAPI = {
  getByCourseId: (courseId: number) => api.get(`/quizzes/course/${courseId}`),
  getById: (id: number) => api.get(`/quizzes/${id}`),
  submitAttempt: (id: number, answers: any) =>
    api.post(`/quizzes/${id}/attempt`, { answers }),
  getAttempts: (id: number) => api.get(`/quizzes/${id}/attempts`),
  create: (data: any) => api.post('/quizzes', data),
};

// Progress API
export const progressAPI = {
  getDashboard: () => api.get('/progress/dashboard'),
  getCourseProgress: (courseId: number) =>
    api.get(`/progress/course/${courseId}`),
};

// AI API
export const aiAPI = {
  ask: (question: string, courseContext?: string) =>
    api.post('/ai/ask', { question, courseContext }),
  getHistory: () => api.get('/ai/history'),
};

export default api;
