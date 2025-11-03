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
    api.post('/api/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
  getProfile: () => api.get('/api/auth/profile'),
};

// Course API
export const courseAPI = {
  getAll: () => api.get('/api/courses'),
  getById: (id: number) => api.get(`/api/courses/${id}`),
  getEnrolled: () => api.get('/api/courses/enrolled'),
  enroll: (id: number) => api.post(`/api/courses/${id}/enroll`),
  create: (data: any) => api.post('/api/courses', data),
  update: (id: number, data: any) => api.put(`/api/courses/${id}`, data),
  delete: (id: number) => api.delete(`/api/courses/${id}`),
};

// Lesson API
export const lessonAPI = {
  getByCourseId: (courseId: number) => api.get(`/api/lessons/course/${courseId}`),
  getById: (id: number) => api.get(`/api/lessons/${id}`),
  markComplete: (id: number) => api.post(`/api/lessons/${id}/complete`),
  create: (data: any) => api.post('/api/lessons', data),
  update: (id: number, data: any) => api.put(`/api/lessons/${id}`, data),
  delete: (id: number) => api.delete(`/api/lessons/${id}`),
};

// Quiz API
export const quizAPI = {
  getByCourseId: (courseId: number) => api.get(`/api/quizzes/course/${courseId}`),
  getById: (id: number) => api.get(`/api/quizzes/${id}`),
  submitAttempt: (id: number, answers: any) =>
    api.post(`/api/quizzes/${id}/attempt`, { answers }),
  getAttempts: (id: number) => api.get(`/api/quizzes/${id}/attempts`),
  create: (data: any) => api.post('/api/quizzes', data),
};

// Progress API
export const progressAPI = {
  getDashboard: () => api.get('/api/progress/dashboard'),
  getCourseProgress: (courseId: number) =>
    api.get(`/api/progress/course/${courseId}`),
};

// AI API
export const aiAPI = {
  ask: (question: string, courseContext?: string) =>
    api.post('/api/ai/ask', { question, courseContext }),
  getHistory: () => api.get('/api/ai/history'),
};

export default api;
