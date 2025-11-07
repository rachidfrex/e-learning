import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllProgress } from '../../services/progressService';
import { AuthContext } from '../../context/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const data = await getAllProgress();
      setProgress(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading progress:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Track your learning progress and continue your courses</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{progress.length}</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>
              {progress.reduce((sum, p) => sum + p.completedLessons.length, 0)}
            </h3>
            <p>Completed Lessons</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{progress.reduce((sum, p) => sum + p.quizAttempts.length, 0)}</h3>
            <p>Quizzes Taken</p>
          </div>
        </div>
      </div>

      <div className="courses-progress">
        <h2>Your Courses</h2>
        {progress.length === 0 ? (
          <div className="no-progress">
            <p>You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="progress-list">
            {progress.map((item) => (
              <div key={item._id} className="progress-card">
                <div className="progress-header">
                  <h3>{item.course?.title}</h3>
                  <span className="progress-percentage">
                    {item.progressPercentage}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.progressPercentage}%` }}
                  ></div>
                </div>
                <div className="progress-stats">
                  <span>{item.completedLessons.length} lessons completed</span>
                  <span>{item.quizAttempts.length} quizzes taken</span>
                </div>
                <Link
                  to={`/courses/${item.course._id}`}
                  className="btn btn-continue"
                >
                  Continue Learning
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/courses" className="action-card">
            <div className="action-icon">🔍</div>
            <h3>Browse Courses</h3>
            <p>Discover new learning opportunities</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
