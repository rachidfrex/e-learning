import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseAPI, lessonAPI } from '../services/api';
import { isAuthenticated } from '../utils/auth';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor_name: string;
  level: string;
  duration_minutes: number;
}

interface Lesson {
  id: number;
  title: string;
  duration_minutes: number;
  order_number: number;
}

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          courseAPI.getById(parseInt(id!)),
          lessonAPI.getByCourseId(parseInt(id!)),
        ]);
        setCourse(courseRes.data.course);
        setLessons(lessonsRes.data.lessons);
      } catch (err) {
        console.error('Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await courseAPI.enroll(parseInt(id!));
      setEnrolled(true);
      alert('Successfully enrolled in the course!');
    } catch (err) {
      alert('Failed to enroll in course');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>
          
          <div className="flex items-center space-x-6 text-gray-700 mb-6">
            <span>👨‍🏫 {course.instructor_name || 'Instructor'}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {course.level || 'All Levels'}
            </span>
            {course.duration_minutes && (
              <span>⏱️ {course.duration_minutes} minutes</span>
            )}
          </div>

          {isAuthenticated() && !enrolled && (
            <button
              onClick={handleEnroll}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Enroll in Course
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Course Content</h2>
          
          {lessons.length === 0 ? (
            <p className="text-gray-600">No lessons available yet.</p>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500">
                        {lesson.order_number}.
                      </span>
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    {lesson.duration_minutes && (
                      <span className="text-gray-500 text-sm">
                        {lesson.duration_minutes} min
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
