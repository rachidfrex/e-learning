import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonAPI } from '../services/api';

interface Lesson {
  id: number;
  course_id: number;
  title: string;
  content: string;
  transcript: string;
  video_url?: string;
  duration_minutes: number;
}

const LessonPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await lessonAPI.getById(parseInt(id!));
        setLesson(response.data.lesson);
      } catch (err) {
        console.error('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleMarkComplete = async () => {
    try {
      await lessonAPI.markComplete(parseInt(id!));
      alert('Lesson marked as complete!');
      navigate(`/courses/${lesson?.course_id}`);
    } catch (err) {
      alert('Failed to mark lesson as complete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Lesson not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(`/courses/${lesson.course_id}`)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Course
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {lesson.video_url ? (
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p>Video Player</p>
                <p className="text-sm text-gray-400 mt-2">{lesson.video_url}</p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">📖</div>
                <p className="text-xl">Text-based Lesson</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          
          {lesson.duration_minutes && (
            <div className="text-gray-600 mb-6">
              ⏱️ Duration: {lesson.duration_minutes} minutes
            </div>
          )}

          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">{lesson.content}</div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="mb-4 text-blue-600 hover:underline"
            >
              {showTranscript ? '▼ Hide Transcript' : '▶ Show Transcript'}
            </button>
            
            {showTranscript && lesson.transcript && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold mb-3">Transcript</h3>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {lesson.transcript}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleMarkComplete}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
