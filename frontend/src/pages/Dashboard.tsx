import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { progressAPI, courseAPI } from '../services/api';

interface CourseProgress {
  course_id: number;
  course_title: string;
  total_lessons: number;
  completed_lessons: number;
  overall_progress: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor_name: string;
}

const Dashboard = () => {
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, coursesRes] = await Promise.all([
          progressAPI.getDashboard(),
          courseAPI.getEnrolled(),
        ]);
        setProgress(progressRes.data.progress);
        setEnrolledCourses(coursesRes.data.courses);
      } catch (err) {
        console.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <div className="text-gray-600">Enrolled Courses</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold">
              {progress.reduce((sum, p) => sum + Number(p.completed_lessons), 0)}
            </div>
            <div className="text-gray-600">Completed Lessons</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold">
              {progress.length > 0
                ? Math.round(
                    progress.reduce((sum, p) => sum + Number(p.overall_progress), 0) /
                      progress.length
                  )
                : 0}%
            </div>
            <div className="text-gray-600">Average Progress</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <Link
                to="/courses"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const courseProgress = progress.find(p => p.course_id === course.id);
                const progressPercentage = courseProgress
                  ? Math.round(Number(courseProgress.overall_progress))
                  : 0;

                return (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="block border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {course.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          👨‍🏫 {course.instructor_name || 'Instructor'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {progressPercentage}%
                        </div>
                        <div className="text-sm text-gray-500">Complete</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    
                    {courseProgress && (
                      <div className="mt-2 text-sm text-gray-600">
                        {courseProgress.completed_lessons} of{' '}
                        {courseProgress.total_lessons} lessons completed
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="mb-6">
            Ask our AI Teacher any questions about your courses
          </p>
          <Link
            to="/ai-teacher"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-semibold"
          >
            Chat with AI Teacher
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
