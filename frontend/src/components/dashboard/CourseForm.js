import React, { useState, useEffect } from 'react';
import { createCourse, updateCourse } from '../../services/courseService';
import './CourseForm.css';

const CourseForm = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'programming',
    level: 'beginner',
    published: false,
    lessons: []
  });

  useEffect(() => {
    if (course) {
      setFormData(course);
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddLesson = () => {
    setFormData({
      ...formData,
      lessons: [
        ...formData.lessons,
        {
          title: '',
          content: '',
          duration: 0,
          order: formData.lessons.length,
          quiz: { questions: [] }
        }
      ]
    });
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index][field] = value;
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const handleRemoveLesson = (index) => {
    const updatedLessons = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (course) {
        await updateCourse(course._id, formData);
        alert('Course updated successfully');
      } else {
        await createCourse(formData);
        alert('Course created successfully');
      }
      onClose();
    } catch (error) {
      console.error('Error saving course:', error);
      alert(error.response?.data?.message || 'Failed to save course');
    }
  };

  return (
    <div className="course-form-overlay">
      <div className="course-form-container">
        <div className="form-header">
          <h2>{course ? 'Edit Course' : 'Create New Course'}</h2>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="science">Science</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Level</label>
              <select name="level" value={formData.level} onChange={handleChange}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
              />
              <span>Publish Course</span>
            </label>
          </div>

          <div className="lessons-section">
            <div className="lessons-header">
              <h3>Lessons</h3>
              <button type="button" onClick={handleAddLesson} className="btn-add-lesson">
                Add Lesson
              </button>
            </div>

            {formData.lessons.map((lesson, index) => (
              <div key={index} className="lesson-form">
                <div className="lesson-header">
                  <h4>Lesson {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveLesson(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>

                <div className="form-group">
                  <label>Lesson Title</label>
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    value={lesson.content}
                    onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    value={lesson.duration}
                    onChange={(e) => handleLessonChange(index, 'duration', parseInt(e.target.value))}
                    min="0"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-submit">
              {course ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
