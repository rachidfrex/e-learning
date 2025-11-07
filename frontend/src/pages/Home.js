import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn Anything, Anytime, Anywhere
          </h1>
          <p className="hero-subtitle">
            Join thousands of learners on our interactive e-learning platform
            with AI-powered assistance
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-hero-primary">
              Get Started Free
            </Link>
            <Link to="/courses" className="btn btn-hero-secondary">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals and experienced educators</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Teacher Assistant</h3>
            <p>Get instant help and personalized guidance powered by AI</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your learning journey with detailed analytics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Interactive Quizzes</h3>
            <p>Test your knowledge with engaging assessments</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Learn Anywhere</h3>
            <p>Access courses on any device, anytime</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Certificates</h3>
            <p>Earn certificates upon course completion</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Learning?</h2>
          <p>Join our community of learners today and unlock your potential</p>
          <Link to="/register" className="btn btn-cta">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
