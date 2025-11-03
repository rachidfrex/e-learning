import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonPlayer from './pages/LessonPlayer';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import AITeacher from './pages/AITeacher';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route
            path="/lessons/:id"
            element={
              <PrivateRoute>
                <LessonPlayer />
              </PrivateRoute>
            }
          />
          <Route
            path="/quizzes/:id"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/ai-teacher"
            element={
              <PrivateRoute>
                <AITeacher />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
