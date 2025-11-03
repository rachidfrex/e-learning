import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to E-Learning Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn at your own pace with our comprehensive courses and AI-powered teaching assistant
          </p>
          <div className="space-x-4">
            <Link
              to="/courses"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
            >
              Browse Courses
            </Link>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 text-lg font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Rich Course Content</h3>
            <p className="text-gray-600">
              Access a wide variety of courses with video lessons, transcripts, and interactive content.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">AI Teaching Assistant</h3>
            <p className="text-gray-600">
              Get instant help from our AI teacher. Ask questions anytime and receive detailed explanations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
            <p className="text-gray-600">
              Monitor your learning journey with detailed progress tracking and quiz assessments.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-6">
            Join thousands of students already learning on our platform
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 text-lg font-semibold"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
