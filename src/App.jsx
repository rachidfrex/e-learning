import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import DashboardLayout from './components/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard.jsx';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import LessonPlayer from './pages/LessonPlayer';
import './i18n/config';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/features" element={<LandingPage />} />
          <Route path="/about" element={<LandingPage />} />
          
          {/* Dashboard Routes - All with persistent sidebar */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<CourseCatalog />} />
            <Route path="courses/:slug" element={<CourseDetail />} />
            <Route path="learn/:lessonId" element={<LessonPlayer />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
