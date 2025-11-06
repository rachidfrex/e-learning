import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Grid3x3, List, Star, Clock, Users, BookOpen, ChevronDown, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIChat from '../components/AIChat';

const LanguageCourses = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const languages = [
    { id: 'all', name: t('languages.all') },
    { id: 'arabic', name: t('languages.arabic'), flag: '🇸🇦' },
    { id: 'english', name: t('languages.english'), flag: '🇺🇸' },
    { id: 'french', name: t('languages.french'), flag: '🇫🇷' }
  ];

  const levels = [
    { id: 'all', name: t('levels.all') },
    { id: 'beginner', name: t('levels.beginner') },
    { id: 'intermediate', name: t('levels.intermediate') },
    { id: 'advanced', name: t('levels.advanced') }
  ];

  const languageCourses = [
    {
      id: 1,
      slug: 'introduction-to-english',
      title: 'Introduction to English',
      instructor: 'Captain John Miller',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop',
      rating: 4.9,
      reviews: 28000,
      students: 95000,
      duration: '20h',
      lessons: 65,
      level: 'Beginner',
      language: 'english',
      description: 'Learn English fundamentals for professional military communication',
      features: ['Basic Grammar', 'Essential Vocabulary', 'Simple Conversations', 'Pronunciation']
    },
    {
      id: 2,
      slug: 'english-military-communication',
      title: 'English for Military Communication',
      instructor: 'Major Robert Smith',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&h=300&fit=crop',
      rating: 4.8,
      reviews: 32000,
      students: 120000,
      duration: '28h',
      lessons: 96,
      level: 'Intermediate',
      language: 'english',
      description: 'Master English for military operations and international communications',
      features: ['Military Terms', 'Radio Communications', 'Report Writing', 'NATO Phonetic Alphabet']
    },
    {
      id: 3,
      slug: 'french-military-operations',
      title: 'Français pour Opérations Militaires',
      instructor: 'Capitaine Marie Dubois',
      image: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=500&h=300&fit=crop',
      rating: 4.7,
      reviews: 18000,
      students: 62000,
      duration: '32h',
      lessons: 108,
      level: 'Intermediate',
      language: 'french',
      description: 'Apprendre le français pour les contextes militaires et les missions internationales',
      features: ['Vocabulaire Militaire', 'Opérations de Terrain', 'Traduction de Documents', 'Régions Francophones']
    },
    {
      id: 4,
      slug: 'advanced-arabic-military',
      title: 'العربية المتقدمة للعسكريين',
      instructor: 'العقيد حسن خليل',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&h=300&fit=crop',
      rating: 4.9,
      reviews: 15000,
      students: 48000,
      duration: '40h',
      lessons: 144,
      level: 'Advanced',
      language: 'arabic',
      description: 'العربية المتقدمة للعمليات العسكرية المعقدة والمفاوضات',
      features: ['الترجمة التقنية', 'المفاوضات', 'الاتصالات الاستراتيجية', 'اللهجات الإقليمية']
    },
    {
      id: 5,
      slug: 'english-nato-standards',
      title: 'English: NATO Standards',
      instructor: 'Lt. Col. James Wilson',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop',
      rating: 4.8,
      reviews: 28000,
      students: 95000,
      duration: '24h',
      lessons: 80,
      level: 'Advanced',
      language: 'english',
      description: 'Master NATO standard English for international military cooperation',
      features: ['NATO Terminology', 'Joint Operations', 'Briefing Skills', 'International Protocol']
    },
    {
      id: 6,
      slug: 'french-peacekeeping-missions',
      title: 'Français pour Missions de Maintien de la Paix',
      instructor: 'Major Sophie Laurent',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=300&fit=crop',
      rating: 4.7,
      reviews: 12000,
      students: 41000,
      duration: '26h',
      lessons: 88,
      level: 'Intermediate',
      language: 'french',
      description: 'Compétences linguistiques en français pour les opérations de maintien de la paix',
      features: ['Terminologie ONU', 'Opérations Humanitaires', 'Engagement Local', 'Communication de Crise']
    },
    {
      id: 7,
      slug: 'arabic-dialects-middle-east',
      title: 'اللهجات العربية: الشرق الأوسط',
      instructor: 'د. نادية إبراهيم',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
      rating: 4.8,
      reviews: 19000,
      students: 67000,
      duration: '36h',
      lessons: 132,
      level: 'Advanced',
      language: 'arabic',
      description: 'إتقان اللهجات العربية في الشرق الأوسط للعمليات الميدانية',
      features: ['اللهجة الخليجية', 'العربية الشامية', 'العربية المصرية', 'الفروق الثقافية']
    },
    {
      id: 8,
      slug: 'english-technical-writing',
      title: 'English Technical Writing for Military',
      instructor: 'Major Emily Carter',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop',
      rating: 4.9,
      reviews: 24000,
      students: 78000,
      duration: '22h',
      lessons: 72,
      level: 'Advanced',
      language: 'english',
      description: 'Master technical writing for military reports and documentation',
      features: ['Report Writing', 'Technical Documentation', 'After-Action Reviews', 'Strategic Briefs']
    },
    {
      id: 9,
      slug: 'french-african-operations',
      title: 'Français pour Opérations Africaines',
      instructor: 'Colonel Pierre Kamara',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=500&h=300&fit=crop',
      rating: 4.7,
      reviews: 14000,
      students: 52000,
      duration: '30h',
      lessons: 100,
      level: 'Intermediate',
      language: 'french',
      description: 'Langue française pour les opérations militaires en Afrique francophone',
      features: ['Français Africain', 'Coutumes Locales', 'Sécurité Régionale', 'Engagement Communautaire']
    }
  ];

  // Filter courses
  const filteredCourses = languageCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-transparent">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Languages className="text-primary" size={40} />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Language Courses / دورات اللغات
            </h1>
          </div>
          <p className="text-gray-600 dark:text-white/60 text-lg">
            Master Arabic, English, and French for military operations / إتقان العربية والإنجليزية والفرنسية للعمليات العسكرية
          </p>
          <p className="text-primary font-semibold mt-2">
            {languageCourses.length} specialized language courses available
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
                  placeholder="Search language courses... / ابحث عن دورات اللغات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#17362d] border-2 border-gray-200 dark:border-[#2e6b5b] rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Language Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#17362d] border-2 border-gray-200 dark:border-[#2e6b5b] rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>
                      {lang.flag ? `${lang.flag} ${lang.name}` : lang.name}
                    </option>
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

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Languages className="text-primary flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Why Language Training Matters / أهمية التدريب اللغوي
              </h3>
              <p className="text-gray-700 dark:text-white/80">
                Language skills are crucial for international military operations, coalition building, and effective communication in diverse environments. Our courses combine military terminology with practical field scenarios.
              </p>
              <p className="text-gray-700 dark:text-white/80 mt-2" dir="rtl">
                المهارات اللغوية ضرورية للعمليات العسكرية الدولية وبناء التحالفات والتواصل الفعال في البيئات المتنوعة. تجمع دوراتنا بين المصطلحات العسكرية والسيناريوهات الميدانية العملية.
              </p>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600 dark:text-white/60">
            <span className="font-semibold text-gray-900 dark:text-white">{filteredCourses.length}</span> language courses found
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

        {/* Courses Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Link
                key={course.id}
                to={`/languages/${course.slug}`}
                className="group bg-white dark:bg-[#204b40]/50 rounded-xl overflow-hidden border border-gray-200 dark:border-primary/10 hover:shadow-xl transition-all"
              >
                {/* Course Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-[#0f241e] px-3 py-1 rounded-full text-sm font-bold">
                    {languages.find(l => l.id === course.language)?.flag} {course.language.toUpperCase()}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
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

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-white/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {course.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
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
                to={`/languages/${course.slug}`}
                className="group bg-white dark:bg-[#204b40]/50 rounded-xl overflow-hidden border border-gray-200 dark:border-primary/10 hover:shadow-xl transition-all flex flex-col md:flex-row"
              >
                {/* Course Image */}
                <div className="relative md:w-72 aspect-video md:aspect-auto overflow-hidden flex-shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-[#0f241e] px-3 py-1 rounded-full text-sm font-bold">
                    {languages.find(l => l.id === course.language)?.flag} {course.language.toUpperCase()}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
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

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>

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
              No language courses found
            </h3>
            <p className="text-gray-600 dark:text-white/60">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* AI Chat Component */}
      <AIChat />
    </div>
  );
};

export default LanguageCourses;
