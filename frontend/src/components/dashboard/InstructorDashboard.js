import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInstructorCourses, deleteCourse } from '../../services/courseService';
import CourseForm from './CourseForm';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getInstructorCourses();
      setCourses(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading courses:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await deleteCourse(id);
      alert('Course deleted successfully');
      loadCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCourse(null);
    loadCourses();
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="instructor-dashboard-container">
      <div className="instructor-header">
        <h1>Instructor Dashboard</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-create">
          Create New Course
        </button>
      </div>

      {showForm && (
        <CourseForm
          course={editingCourse}
          onClose={handleFormClose}
        />
      )}

      <div className="instructor-stats">
        <div className="stat-box">
          <h3>{courses.length}</h3>
          <p>Total Courses</p>
        </div>
        <div className="stat-box">
          <h3>{courses.filter(c => c.published).length}</h3>
          <p>Published</p>
        </div>
        <div className="stat-box">
          <h3>{courses.reduce((sum, c) => sum + c.enrolledStudents.length, 0)}</h3>
          <p>Total Students</p>
        </div>
      </div>

      <div className="instructor-courses">
        <h2>My Courses</h2>
        {courses.length === 0 ? (
          <div className="no-courses">
            <p>You haven't created any courses yet.</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary">
              Create Your First Course
            </button>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="instructor-course-card">
                <div className="course-status">
                  <span className={`badge ${course.published ? 'published' : 'draft'}`}>
                    {course.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description.substring(0, 100)}...</p>
                <div className="course-stats">
                  <span>📚 {course.lessons.length} lessons</span>
                  <span>👥 {course.enrolledStudents.length} students</span>
                </div>
                <div className="course-actions">
                  <button onClick={() => handleEdit(course)} className="btn-edit">
                    Edit
                  </button>
                  <Link to={`/courses/${course._id}`} className="btn-view">
                    View
                  </Link>
                  <button onClick={() => handleDelete(course._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
