import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, enrollCourse } from '../../services/courseService';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const data = await getCourse(id);
      setCourse(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading course:', error);
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await enrollCourse(id);
      alert('Successfully enrolled in course!');
      navigate(`/lesson/${id}/${course.lessons[0]._id}`);
    } catch (error) {
      console.error('Error enrolling:', error);
      alert(error.response?.data?.message || 'Failed to enroll');
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading course...</div>;
  }

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  return (
    <div className="course-detail-container">
      <div className="course-header">
        <div className="course-header-content">
          <span className="course-category">{course.category}</span>
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-info">
            <span className="info-item">
              <strong>Level:</strong> {course.level}
            </span>
            <span className="info-item">
              <strong>Lessons:</strong> {course.lessons.length}
            </span>
            <span className="info-item">
              <strong>Instructor:</strong> {course.instructor?.name}
            </span>
          </div>
          <button 
            onClick={handleEnroll} 
            disabled={enrolling}
            className="btn btn-enroll"
          >
            {enrolling ? 'Enrolling...' : 'Enroll Now'}
          </button>
        </div>
      </div>

      <div className="course-lessons">
        <h2>Course Content</h2>
        <div className="lessons-list">
          {course.lessons.map((lesson, index) => (
            <div key={lesson._id} className="lesson-item">
              <div className="lesson-number">{index + 1}</div>
              <div className="lesson-info">
                <h3>{lesson.title}</h3>
                <p>{lesson.content.substring(0, 150)}...</p>
                <div className="lesson-meta">
                  {lesson.duration && <span>{lesson.duration} min</span>}
                  {lesson.quiz && lesson.quiz.questions?.length > 0 && (
                    <span>Quiz: {lesson.quiz.questions.length} questions</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
