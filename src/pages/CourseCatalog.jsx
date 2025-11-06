import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Grid3x3, List, Star, Clock, Users, BookOpen, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseCatalog = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'programming', name: 'Programming' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'data-science', name: 'Data Science' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const courses = [
    {
      id: 1,
      slug: 'python-complete-bootcamp',
      title: 'Complete Python Bootcamp',
      instructor: 'Jose Portilla',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop',
      rating: 4.7,
      reviews: 125000,
      students: 450000,
      duration: '22h',
      lessons: 156,
      level: 'Beginner',
      category: 'programming',
      price: 'Free',
      description: 'Learn Python from scratch with hands-on projects'
    },
    {
      id: 2,
      slug: 'web-design-masterclass',
      title: 'Web Design Masterclass',
      instructor: 'Brad Schiff',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      rating: 4.9,
      reviews: 89000,
      students: 320000,
      duration: '18h',
      lessons: 124,
      level: 'Intermediate',
      category: 'design',
      price: 'Free',
      description: 'Master modern web design techniques and tools'
    },
    {
      id: 3,
      slug: 'digital-marketing-complete',
      title: 'Complete Digital Marketing Course',
      instructor: 'Angela Yu',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      rating: 4.6,
      reviews: 76000,
      students: 280000,
      duration: '25h',
      lessons: 180,
      level: 'Beginner',
      category: 'marketing',
      price: 'Free',
      description: 'Learn all aspects of digital marketing from SEO to social media'
    },
    {
      id: 4,
      slug: 'data-science-machine-learning',
      title: 'Data Science & Machine Learning',
      instructor: 'Kirill Eremenko',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      rating: 4.8,
      reviews: 95000,
      students: 380000,
      duration: '40h',
      lessons: 285,
      level: 'Advanced',
      category: 'data-science',
      price: 'Free',
      description: 'Complete data science and ML course with Python and R'
    },
    {
      id: 5,
      slug: 'javascript-complete-guide',
      title: 'JavaScript - The Complete Guide',
      instructor: 'Maximilian Schwarzmüller',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&h=300&fit=crop',
      rating: 4.7,
      reviews: 110000,
      students: 420000,
      duration: '52h',
      lessons: 612,
      level: 'Beginner',
      category: 'programming',
      price: 'Free',
      description: 'Modern JavaScript from scratch to advanced level'
    },
    {
      id: 6,
      slug: 'business-strategy-fundamentals',
      title: 'Business Strategy Fundamentals',
      instructor: 'Chris Haroun',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
      rating: 4.5,
      reviews: 52000,
      students: 180000,
      duration: '12h',
      lessons: 98,
      level: 'Intermediate',
      category: 'business',
      price: 'Free',
      description: 'Learn core business strategy concepts and frameworks'
    }
  ];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Courses
          </h1>
          <p className="text-gray-600 dark:text-white/60">
            Discover {courses.length} courses to advance your skills
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-[#204b40]/50 rounded-xl p-6 mb-8 border border-gray-200 dark:border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/50" size={20} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#17362d] border-2 border-gray-200 dark:border-[#2e6b5b] rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#17362d] border-2 border-gray-200 dark:border-[#2e6b5b] rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/50 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Level Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#17362d] border-2 border-gray-200 dark:border-[#2e6b5b] rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/50 pointer-events-none" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600 dark:text-white/60">
            <span className="font-semibold text-gray-900 dark:text-white">{filteredCourses.length}</span> courses found
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white dark:bg-[#204b40]/50 rounded-lg p-1 border border-gray-200 dark:border-primary/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-[#0f241e]' : 'text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5'} transition-colors`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-[#0f241e]' : 'text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5'} transition-colors`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                className="group bg-white dark:bg-[#204b40]/50 rounded-xl overflow-hidden border border-gray-200 dark:border-primary/10 hover:shadow-xl transition-all"
              >
                {/* Course Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-[#0f241e] px-3 py-1 rounded-full text-sm font-bold">
                    {course.price}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                      {course.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-[#17362d] text-gray-700 dark:text-white/70 text-xs font-semibold rounded">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-white/60 mb-3">
                    {course.instructor}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-white/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-500" size={16} fill="currentColor" />
                      <span className="font-semibold text-gray-900 dark:text-white">{course.rating}</span>
                      <span>({course.reviews.toLocaleString()})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-white/60">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map(course => (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                className="group bg-white dark:bg-[#204b40]/50 rounded-xl overflow-hidden border border-gray-200 dark:border-primary/10 hover:shadow-xl transition-all flex flex-col md:flex-row"
              >
                {/* Course Image */}
                <div className="relative md:w-72 aspect-video md:aspect-auto overflow-hidden flex-shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-[#0f241e] px-3 py-1 rounded-full text-sm font-bold">
                    {course.price}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                      {course.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-[#17362d] text-gray-700 dark:text-white/70 text-xs font-semibold rounded">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-white/60 mb-3">
                    By {course.instructor}
                  </p>

                  <p className="text-gray-700 dark:text-white/80 mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-white/60">
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-500" size={16} fill="currentColor" />
                      <span className="font-semibold text-gray-900 dark:text-white">{course.rating}</span>
                      <span>({course.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-white/40 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-white/60">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CourseCatalog;
