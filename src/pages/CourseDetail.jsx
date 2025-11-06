import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import {
  Star, Clock, Users, Globe, Award, PlayCircle, BookOpen, FileText,
  Check, ChevronDown, ChevronUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [expandedModule, setExpandedModule] = useState(0);

  // Mock course data (in real app, fetch from API)
  const course = {
    id: 1,
    slug: 'python-complete-bootcamp',
    title: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
    subtitle: 'Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!',
    instructor: {
      name: 'Jose Portilla',
      title: 'Head of Data Science, Pierian Data Inc.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 4.7,
      students: 1250000,
      courses: 38
    },
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=600&fit=crop',
    rating: 4.7,
    reviews: 125000,
    students: 450000,
    duration: '22h',
    lessons: 156,
    level: 'Beginner',
    language: 'English',
    lastUpdated: 'November 2024',
    price: 'Free',
    description: `This course will take you from a complete beginner to an advanced Python programmer. You'll learn Python programming from scratch with hands-on projects and real-world examples.

We'll cover everything from Python basics to advanced topics like object-oriented programming, file I/O, error handling, and working with databases. You'll also build multiple projects including games, automation scripts, and web applications.`,
    
    whatYouLearn: [
      'Learn to use Python professionally, learning both Python 2 and Python 3!',
      'Create games with Python, like Tic Tac Toe and Blackjack!',
      'Learn advanced Python features, like the collections module and how to work with timestamps!',
      'Learn to use Object Oriented Programming with classes!',
      'Understand complex topics, like decorators.',
      'Understand how to use both the Jupyter Notebook and create .py files',
      'Get an understanding of how to create GUIs in the Jupyter Notebook system!',
      'Build a complete understanding of Python from the ground up!'
    ],

    requirements: [
      'Access to a computer with an internet connection.',
      'No prior programming experience needed!',
      'Just enthusiasm to learn Python!'
    ],

    curriculum: [
      {
        id: 1,
        title: 'Course Introduction',
        lessons: 5,
        duration: '25min',
        items: [
          { id: 1, title: 'Introduction to the Course', type: 'video', duration: '5:30', preview: true },
          { id: 2, title: 'Course Curriculum Overview', type: 'video', duration: '4:15', preview: true },
          { id: 3, title: 'Setting Up Python', type: 'video', duration: '8:45', preview: false },
          { id: 4, title: 'Running Python Code', type: 'video', duration: '6:20', preview: false },
          { id: 5, title: 'Getting the Course Notebooks', type: 'article', duration: '2min', preview: false }
        ]
      },
      {
        id: 2,
        title: 'Python Basics',
        lessons: 18,
        duration: '2h 30min',
        items: [
          { id: 6, title: 'Python Object and Data Structure Basics', type: 'video', duration: '12:30', preview: false },
          { id: 7, title: 'Numbers in Python', type: 'video', duration: '10:15', preview: false },
          { id: 8, title: 'Variable Assignments', type: 'video', duration: '8:45', preview: false },
          { id: 9, title: 'Strings', type: 'video', duration: '15:20', preview: false },
          { id: 10, title: 'Print Formatting', type: 'video', duration: '12:10', preview: false },
          { id: 11, title: 'Lists in Python', type: 'video', duration: '18:30', preview: false },
          { id: 12, title: 'Dictionaries', type: 'video', duration: '14:25', preview: false },
          { id: 13, title: 'Quiz: Python Basics', type: 'quiz', duration: '15min', preview: false }
        ]
      },
      {
        id: 3,
        title: 'Python Statements',
        lessons: 12,
        duration: '1h 45min',
        items: [
          { id: 14, title: 'Introduction to Python Statements', type: 'video', duration: '8:30', preview: false },
          { id: 15, title: 'If, Elif, and Else Statements', type: 'video', duration: '12:15', preview: false },
          { id: 16, title: 'For Loops', type: 'video', duration: '15:45', preview: false },
          { id: 17, title: 'While Loops', type: 'video', duration: '10:20', preview: false },
          { id: 18, title: 'Quiz: Python Statements', type: 'quiz', duration: '20min', preview: false }
        ]
      },
      {
        id: 4,
        title: 'Methods and Functions',
        lessons: 15,
        duration: '2h 15min',
        items: [
          { id: 19, title: 'Introduction to Functions', type: 'video', duration: '10:30', preview: false },
          { id: 20, title: 'def keyword', type: 'video', duration: '8:15', preview: false },
          { id: 21, title: 'Basics of Python Functions', type: 'video', duration: '12:45', preview: false },
          { id: 22, title: 'Logic with Python Functions', type: 'video', duration: '15:20', preview: false }
        ]
      }
    ]
  };

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#17362d] to-[#0f231e] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm mb-4 text-white/70">
                <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
                <span>/</span>
                <span>{course.title}</span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/80 mb-6">{course.subtitle}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="text-amber-400" size={18} fill="currentColor" />
                    <span className="font-bold">{course.rating}</span>
                  </div>
                  <span className="text-white/70">({course.reviews.toLocaleString()} ratings)</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Users size={18} />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-white/70">Created by</p>
                  <p className="font-semibold">{course.instructor.name}</p>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{course.duration} total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} />
                  <span>{course.level}</span>
                </div>
              </div>
            </div>

            {/* Course Card (Sticky on desktop) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#204b40] rounded-xl overflow-hidden shadow-xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {course.price}
                  </div>
                  <Link
                    to={`/learn/${course.slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-[#0f241e] font-bold py-3 px-6 rounded-lg transition-colors mb-3"
                  >
                    <PlayCircle size={20} />
                    <span>Start Learning</span>
                  </Link>
                  <button className="w-full border-2 border-gray-300 dark:border-primary/30 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white dark:bg-[#204b40]/50 rounded-xl p-8 border border-gray-200 dark:border-primary/10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700 dark:text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Curriculum */}
            <div className="bg-white dark:bg-[#204b40]/50 rounded-xl p-8 border border-gray-200 dark:border-primary/10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Course Content
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-6">
                {course.curriculum.length} sections • {course.lessons} lectures • {course.duration} total length
              </p>
              
              <div className="space-y-2">
                {course.curriculum.map((module, index) => (
                  <div
                    key={module.id}
                    className="border border-gray-200 dark:border-primary/10 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#17362d] hover:bg-gray-100 dark:hover:bg-[#204b40]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-left">
                        {expandedModule === module.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-white/60">
                            {module.lessons} lectures • {module.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                    
                    {expandedModule === module.id && (
                      <div className="border-t border-gray-200 dark:border-primary/10">
                        {module.items.map(item => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#17362d] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {item.type === 'video' && <PlayCircle size={16} className="text-gray-400" />}
                              {item.type === 'article' && <FileText size={16} className="text-gray-400" />}
                              {item.type === 'quiz' && <Award size={16} className="text-gray-400" />}
                              <span className="text-gray-700 dark:text-white/80">{item.title}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              {item.preview && (
                                <button className="text-primary text-sm font-semibold hover:underline">
                                  Preview
                                </button>
                              )}
                              <span className="text-sm text-gray-600 dark:text-white/60">{item.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-[#204b40]/50 rounded-xl p-8 border border-gray-200 dark:border-primary/10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Requirements
              </h2>
              <ul className="space-y-3">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">•</span>
                    <span className="text-gray-700 dark:text-white/80">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-[#204b40]/50 rounded-xl p-8 border border-gray-200 dark:border-primary/10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Description
              </h2>
              <div className="text-gray-700 dark:text-white/80 whitespace-pre-line">
                {course.description}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white dark:bg-[#204b40]/50 rounded-xl p-8 border border-gray-200 dark:border-primary/10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Instructor
              </h2>
              <div className="flex items-start gap-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {course.instructor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    {course.instructor.title}
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-white/60">
                    <div className="flex items-center gap-2">
                      <Star className="text-amber-500" size={16} fill="currentColor" />
                      <span>{course.instructor.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{course.instructor.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle size={16} />
                      <span>{course.instructor.courses} courses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (placeholder for future features) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* This course includes */}
              <div className="bg-white dark:bg-[#204b40]/50 rounded-xl p-6 border border-gray-200 dark:border-primary/10">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  This course includes:
                </h3>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-white/80">
                  <li className="flex items-center gap-3">
                    <Clock size={16} className="text-gray-400" />
                    <span>{course.duration} on-demand video</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText size={16} className="text-gray-400" />
                    <span>19 articles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BookOpen size={16} className="text-gray-400" />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe size={16} className="text-gray-400" />
                    <span>Access on mobile and desktop</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award size={16} className="text-gray-400" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
