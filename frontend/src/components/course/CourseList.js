import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/courseService';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading courses:', error);
      setLoading(false);
    }
  };

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.category === filter);

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="course-list-container">
      <h1>Available Courses</h1>
      
      <div className="filter-bar">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'programming' ? 'active' : ''} 
          onClick={() => setFilter('programming')}
        >
          Programming
        </button>
        <button 
          className={filter === 'design' ? 'active' : ''} 
          onClick={() => setFilter('design')}
        >
          Design
        </button>
        <button 
          className={filter === 'business' ? 'active' : ''} 
          onClick={() => setFilter('business')}
        >
          Business
        </button>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course._id} className="course-card">
            <div className="course-thumbnail">
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title} />
              ) : (
                <div className="placeholder-thumbnail">
                  {course.title.charAt(0)}
                </div>
              )}
            </div>
            <div className="course-content">
              <span className="course-category">{course.category}</span>
              <h3>{course.title}</h3>
              <p>{course.description.substring(0, 100)}...</p>
              <div className="course-meta">
                <span className="course-level">{course.level}</span>
                <span className="course-lessons">{course.lessons.length} lessons</span>
              </div>
              <Link to={`/courses/${course._id}`} className="btn btn-view">
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="no-courses">No courses found</p>
      )}
    </div>
  );
};

export default CourseList;
