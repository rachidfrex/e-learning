import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import {
  Star, Clock, Users, Globe, Award, PlayCircle, BookOpen, FileText,
  Check, ChevronDown, ChevronUp
} from 'lucide-react';
import AIChat from '../components/AIChat';

const CourseDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [expandedModule, setExpandedModule] = useState(0);

  // Mock course data (in real app, fetch from API)
  const course = {
    id: 1,
    slug: 'military-correspondence-fundamentals',
    title: 'أساسيات المراسلات العسكرية',
    subtitle: 'تعلم أساسيات الكتابة العسكرية الرسمية والمراسلات الإدارية وفقاً للمعايير المعتمدة',
    instructor: {
      name: 'العقيد أحمد المنصوري',
      title: 'مدير التدريب والتطوير، الأكاديمية العسكرية',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 4.9,
      students: 15000,
      courses: 12
    },
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop',
    rating: 4.9,
    reviews: 3500,
    students: 15000,
    duration: '18h',
    lessons: 42,
    level: 'Beginner',
    language: 'Arabic',
    lastUpdated: 'November 2024',
    price: 'Free',
    description: `هذه الدورة التدريبية الشاملة تغطي جميع جوانب المراسلات العسكرية الرسمية. ستتعلم كيفية كتابة المذكرات الرسمية، التقارير، والخطابات الإدارية وفقاً للمعايير المعتمدة في القوات المسلحة.

سنغطي كل شيء من الأساسيات إلى المواضيع المتقدمة مثل التصنيفات الأمنية، البروتوكولات الرسمية، وإجراءات التوثيق. ستتدرب على كتابة مستندات عسكرية حقيقية وفهم سلسلة القيادة في المراسلات.`,
    
    whatYouLearn: [
      'إتقان أساسيات الكتابة العسكرية الرسمية',
      'كتابة المذكرات والتقارير العسكرية بشكل احترافي',
      'فهم البروتوكولات الرسمية في المراسلات',
      'التعامل مع التصنيفات الأمنية للوثائق',
      'معرفة إجراءات سلسلة القيادة في المراسلات',
      'كتابة الخطابات الإدارية الرسمية',
      'فهم معايير الاتصال العسكري',
      'تطبيق معايير التوثيق والأرشفة العسكرية'
    ],

    requirements: [
      'إجادة القراءة والكتابة باللغة العربية',
      'لا يشترط خبرة سابقة في المراسلات العسكرية',
      'الرغبة في تعلم أساسيات الكتابة الرسمية'
    ],

    curriculum: [
      {
        id: 1,
        title: 'مقدمة الدورة',
        lessons: 5,
        duration: '25min',
        items: [
          { id: 1, title: 'مقدمة عن المراسلات العسكرية', type: 'video', duration: '5:30', preview: true },
          { id: 2, title: 'نظرة عامة على منهج الدورة', type: 'video', duration: '4:15', preview: true },
          { id: 3, title: 'المعايير الأساسية للكتابة الرسمية', type: 'video', duration: '8:45', preview: false },
          { id: 4, title: 'أنواع الوثائق العسكرية', type: 'video', duration: '6:20', preview: false },
          { id: 5, title: 'تحميل نماذج المراسلات', type: 'article', duration: '2min', preview: false }
        ]
      },
      {
        id: 2,
        title: 'أساسيات المراسلات',
        lessons: 18,
        duration: '2h 30min',
        items: [
          { id: 6, title: 'هيكل المذكرة الرسمية', type: 'video', duration: '12:30', preview: false },
          { id: 7, title: 'كتابة العنوان والمقدمة', type: 'video', duration: '10:15', preview: false },
          { id: 8, title: 'صياغة الموضوع الرئيسي', type: 'video', duration: '8:45', preview: false },
          { id: 9, title: 'الخاتمة والتوقيع', type: 'video', duration: '15:20', preview: false },
          { id: 10, title: 'التنسيق والإخراج', type: 'video', duration: '12:10', preview: false },
          { id: 11, title: 'المصطلحات العسكرية الشائعة', type: 'video', duration: '18:30', preview: false },
          { id: 12, title: 'أمثلة عملية', type: 'video', duration: '14:25', preview: false },
          { id: 13, title: 'اختبار: الأساسيات', type: 'quiz', duration: '15min', preview: false }
        ]
      },
      {
        id: 3,
        title: 'التصنيفات الأمنية',
        lessons: 12,
        duration: '1h 45min',
        items: [
          { id: 14, title: 'مقدمة عن التصنيفات الأمنية', type: 'video', duration: '8:30', preview: false },
          { id: 15, title: 'المستويات الأمنية للوثائق', type: 'video', duration: '12:15', preview: false },
          { id: 16, title: 'إجراءات التعامل مع الوثائق السرية', type: 'video', duration: '15:45', preview: false },
          { id: 17, title: 'الأرشفة والحفظ الآمن', type: 'video', duration: '10:20', preview: false },
          { id: 18, title: 'اختبار: التصنيفات الأمنية', type: 'quiz', duration: '20min', preview: false }
        ]
      },
      {
        id: 4,
        title: 'سلسلة القيادة والبروتوكولات',
        lessons: 15,
        duration: '2h 15min',
        items: [
          { id: 19, title: 'مقدمة عن البروتوكولات', type: 'video', duration: '10:30', preview: false },
          { id: 20, title: 'التسلسل الإداري', type: 'video', duration: '8:15', preview: false },
          { id: 21, title: 'إجراءات الاتصال الرسمي', type: 'video', duration: '12:45', preview: false },
          { id: 22, title: 'التطبيقات العملية', type: 'video', duration: '15:20', preview: false }
        ]
      }
    ]
  };

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-transparent">
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
                    to="/learn/military-correspondence-fundamentals"
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

      {/* AI Chat Component */}
      <AIChat />
    </div>
  );
};

export default CourseDetail;
