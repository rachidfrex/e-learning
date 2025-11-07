import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Settings, Maximize, Volume2, Play, Pause,
  FileText, Download, BookOpen, MessageCircle, CheckCircle, Lock,
  List, X, Menu , PlayCircle, Clock
} from 'lucide-react';
import AIChat from '../components/AIChat';
import ArticleLesson from '../components/ArticleLesson';

const LessonPlayer = () => {
  const { t } = useTranslation();
  const { lessonId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('transcript'); // transcript, resources, notes
  const [showSidebar, setShowSidebar] = useState(true);
  const [userNotes, setUserNotes] = useState('');
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('15:30');

  // Determine if this is military correspondence course based on the lessonId/route
  const isMilitaryCourse = lessonId?.includes('military') || lessonId === 'military-correspondence-fundamentals' || !lessonId || lessonId === '1' || lessonId === '4' || lessonId === '5';

  // Mock lesson data - can be 'video' or 'article'
  const lesson = {
    id: 1,
    type: lessonId === '5' ? 'article' : 'video', // Demo: lesson 5 is an article, others are videos
    title: lessonId === '5' ? 'بروتوكولات الاتصال العسكري' : 'مقدمة في المراسلات العسكرية',
    courseTitle: 'أساسيات المراسلات العسكرية',
    courseSlug: 'military-correspondence-fundamentals',
    moduleTitle: 'الوحدة 1: الوثائق الرسمية',
    videoUrl: '', // Empty video URL - we'll show a placeholder
    duration: '15:30',
    readTime: '10 min',
    wordCount: '2,500',
    featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop',
    description: 'تعلم أساسيات المراسلات العسكرية والبروتوكولات والوثائق الرسمية',
    completed: false,
    content: lessonId === '5' ? `
      <h2>بروتوكولات الاتصال العسكري</h2>
      <p>الاتصال الفعال أمر ضروري في العمليات العسكرية. يغطي هذا الدرس البروتوكولات والإجراءات الرئيسية للاتصالات العسكرية.</p>
      
      <h3>1. معايير الاتصال اللاسلكي</h3>
      <p>يتبع الاتصال اللاسلكي العسكري بروتوكولات صارمة:</p>
      <ul>
        <li><strong>رموز الاختصار</strong> - عبارات قصيرة موحدة للتواصل السريع</li>
        <li><strong>الأبجدية الصوتية</strong> - أبجدية الناتو الصوتية للوضوح (Alpha, Bravo, Charlie...)</li>
        <li><strong>النداءات</strong> - معرفات فريدة للوحدات والأفراد</li>
      </ul>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code># مثال على الاتصال اللاسلكي

المرسل: "ألفا واحد إلى برافو اثنين، استقبال"
المستقبل: "برافو اثنين، تفضل، استقبال"
المرسل: "طلب تقرير الحالة، استقبال"
المستقبل: "الحالة خضراء، المهمة مكتملة، استقبال"
المرسل: "تم الاستلام، العودة إلى القاعدة، انتهى"</code></pre>
      </div>

      <h3>2. معايير الكتابة الرسمية</h3>
      <p>يجب أن تكون المراسلات العسكرية المكتوبة واضحة وموجزة ورسمية:</p>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code>مذكرة رسمية

من: القائد، الوحدة ألفا
إلى: جميع الأفراد
التاريخ: [التاريخ الحالي]
الموضوع: تحديث بروتوكول الاتصال

1. جميع الاتصالات اللاسلكية ستستخدم الأبجدية الصوتية للناتو
2. تقارير الحالة اليومية مطلوبة بحلول الساعة 1800
3. قنوات الطوارئ يجب أن تبقى خالية إلا للاتصالات العاجلة

[توقيع القائد]</code></pre>
      </div>

      <h3>3. سلسلة القيادة في الاتصالات</h3>
      <p>اتبع سلسلة القيادة المناسبة عند التواصل:</p>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code>تدفق الاتصالات:

القائد
    ↓
الضابط التنفيذي
    ↓
ضابط العمليات
    ↓
قادة الوحدات
    ↓
الأفراد

ملاحظة: حالات الطوارئ قد تتجاوز القنوات العادية</code></pre>
      </div>

      <h3>4. التصنيفات الأمنية</h3>
      <p>يجب تصنيف جميع الاتصالات العسكرية بشكل صحيح:</p>
      <ul>
        <li><strong>غير سري</strong> - معلومات عامة</li>
        <li><strong>سري</strong> - توزيع محدود</li>
        <li><strong>سري للغاية</strong> - ضرر جسيم في حالة الكشف</li>
        <li><strong>سري للغاية جداً</strong> - ضرر خطير في حالة الكشف</li>
      </ul>

      <h3>ملخص أفضل الممارسات</h3>
      <p>تذكر هذه المبادئ الرئيسية للاتصالات العسكرية:</p>
      <ul>
        <li>كن واضحاً وموجزاً</li>
        <li>اتبع البروتوكولات المناسبة وسلسلة القيادة</li>
        <li>حافظ على الأمن في جميع الأوقات</li>
        <li>وثق جميع الاتصالات الهامة</li>
        <li>مارس الأمن التشغيلي (OPSEC)</li>
      </ul>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code>تذكر:
- الاتصال الواضح ينقذ الأرواح
- الأمن مسؤولية الجميع
- عند الشك، اطلب التوضيح
- وثق كل شيء مهم</code></pre>
      </div>
    ` : null,
    transcript: [
      { time: '0:00', text: 'مرحباً بكم في هذا الدرس حول المراسلات العسكرية. سنغطي أساسيات التوثيق العسكري الرسمي.' },
      { time: '0:15', text: 'تتبع المراسلات العسكرية بروتوكولات وصيغ صارمة. فهم هذه المعايير ضروري للتواصل الفعال.' },
      { time: '0:35', text: 'سنبدأ بالهيكل الأساسي للمذكرة العسكرية والرسائل الرسمية.' },
      { time: '0:50', text: 'يجب أن تتضمن كل وثيقة عسكرية رؤوس مناسبة: من، إلى، التاريخ، وسطور الموضوع.' },
      { time: '1:10', text: 'يجب أن تكون اللغة المستخدمة واضحة وموجزة ومهنية في جميع الأوقات.' },
      { time: '1:30', text: 'على سبيل المثال، عند كتابة تقرير الحالة، استخدم دائماً زمن المضارع والصوت النشط.' },
      { time: '1:50', text: 'علامات التصنيف مهمة. يجب وضع علامات على جميع الوثائق بشكل صحيح وفقاً لمستوى أمانها.' },
      { time: '2:10', text: 'دعنا نناقش سلسلة القيادة المناسبة لتوجيه المراسلات.' },
      { time: '2:30', text: 'يجب أن تتبع الوثائق التسلسل الهرمي المعمول به وتحصل على الموافقات المناسبة.' },
      { time: '2:50', text: 'إليك المبادئ الرئيسية: الدقة والإيجاز والوضوح والشكل المناسب ضرورية للمراسلات العسكرية.' }
    ],
    resources: [
      { id: 1, name: 'دليل المراسلات العسكرية.pdf', size: '3.2 MB', type: 'pdf' },
      { id: 2, name: 'نماذج الرسائل الرسمية.zip', size: '245 KB', type: 'zip' },
      { id: 3, name: 'دليل بروتوكول الاتصال.pdf', size: '4.1 MB', type: 'pdf' }
    ],
    nextLesson: {
      id: 2,
      title: 'كتابة التقارير الرسمية',
      locked: false
    },
    previousLesson: {
      id: 0,
      title: 'مقدمة الدورة',
      locked: false
    }
  };

  // Mock curriculum for sidebar - 3 lessons for demo
  const curriculum = [
    {
      id: 1,
      title: 'مقدمة الدورة',
      lessons: [
        { id: 1, title: 'مرحباً بك في المراسلات العسكرية', duration: '5:30', type: 'video', completed: true },
        { id: 2, title: 'فهم التوثيق العسكري', duration: '8:45', type: 'video', completed: true },
        { id: 3, title: 'رسالتك الرسمية الأولى', duration: '6:20', type: 'video', completed: true }
      ]
    },
    {
      id: 2,
      title: 'الوثائق الرسمية',
      lessons: [
        { id: 4, title: 'مقدمة في المراسلات العسكرية', duration: '15:30', type: 'video', completed: false, current: true },
        { id: 5, title: 'بروتوكولات الاتصال العسكري', duration: '10 min read', type: 'article', completed: false, locked: false },
        { id: 6, title: 'معايير كتابة التقارير', duration: '18:30', type: 'video', completed: false, locked: false }
      ]
    },
    {
      id: 3,
      title: 'إجراءات الاتصال',
      lessons: [
        { id: 7, title: 'إجراءات الاتصال اللاسلكي', duration: '14:20', completed: false, locked: false },
        { id: 8, title: 'بروتوكول سلسلة القيادة', duration: '16:30', completed: false, locked: false },
        { id: 9, title: 'التصنيفات الأمنية', duration: '12:10', completed: false, locked: false }
      ]
    }
  ];

  const handleMarkComplete = () => {
    // Mark lesson as complete and move to next
    console.log('Lesson marked as complete');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Navigation Bar */}
      <div className="bg-[#17362d] border-b border-primary/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <Link
            to={`/courses/${lesson.courseSlug}`}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="hidden md:inline">{t('dashboard.backToCourse')}</span>
          </Link>
          <div className="hidden md:block">
            <h2 className="font-bold text-white">{lesson.courseTitle}</h2>
            <p className="text-sm text-white/60">{lesson.moduleTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
            <span className="text-sm text-white/70">Progress:</span>
            <span className="text-sm font-bold text-primary">4/156</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Curriculum */}
        {showSidebar && (
          <div className="w-full lg:w-80 bg-[#0f231e] border-r border-primary/10 overflow-y-auto">
            <div className="p-4 border-b border-primary/10 flex items-center justify-between lg:justify-start">
              <h3 className="font-bold text-lg">Course Content</h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-2">
              {curriculum.map((module) => (
                <div key={module.id} className="mb-2">
                  <div className="px-3 py-2 text-sm font-semibold text-white/70">
                    {module.title}
                  </div>
                  {module.lessons.map((item) => (
                    <Link
                      key={item.id}
                      to={`/learn/${item.id}`}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        item.current
                          ? 'bg-primary/20 border border-primary/30'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {item.completed ? (
                          <CheckCircle className="text-primary" size={20} />
                        ) : item.locked ? (
                          <Lock className="text-white/30" size={20} />
                        ) : item.type === 'article' ? (
                          <FileText className="text-white/50" size={20} />
                        ) : (
                          <Play className="text-white/50" size={20} />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`text-sm ${item.current ? 'text-white font-semibold' : 'text-white/80'}`}>
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-white/50">{item.duration}</p>
                          {item.type === 'article' && (
                            <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">Article</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Conditional Rendering: Article or Video */}
          {lesson.type === 'article' ? (
            <ArticleLesson lesson={lesson} />
          ) : (
            <>
              {/* Video Player Placeholder */}
              <div className="relative bg-gradient-to-br from-[#17362d] to-[#0f231e] aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <PlayCircle size={48} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {lesson.title}
                  </h3>
                  <p className="text-white/60 mb-6 max-w-md mx-auto">
                    محتوى الفيديو سيتم إضافته قريباً. هذا عرض توضيحي للبنية الأساسية.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {lesson.duration}
                    </span>
                    <span>•</span>
                    <span>{lesson.moduleTitle}</span>
                  </div>
                </div>

                {/* Custom Controls Overlay (optional) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <div className="flex-1 bg-white/20 rounded-full h-1">
                      <div className="bg-primary h-1 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-sm">{currentTime} / {duration}</span>
                    <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                      <Volume2 size={24} />
                    </button>
                    <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                      <Settings size={24} />
                    </button>
                    <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                      <Maximize size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Video-specific content: Title, Navigation, and Tabs */}
          {lesson.type === 'video' && (
            <>
              {/* Lesson Title & Navigation */}
              <div className="bg-[#17362d] border-b border-primary/10 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold mb-1">{lesson.title}</h1>
                <p className="text-sm text-white/60">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={!lesson.previousLesson}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  <span className="hidden md:inline">Previous</span>
                </button>
                <button
                  onClick={handleMarkComplete}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-[#0f241e] font-semibold rounded-lg transition-colors"
                >
                  <CheckCircle size={20} />
                  <span>Mark Complete</span>
                </button>
                <button
                  disabled={lesson.nextLesson.locked}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden md:inline">Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs & Content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
            {/* Tabs */}
            <div className="flex items-center gap-1 px-6 pt-4 border-b border-white/10">
              <button
                onClick={() => setActiveTab('transcript')}
                className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                  activeTab === 'transcript'
                    ? 'bg-[#17362d] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText size={18} />
                <span>Transcript</span>
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-[#17362d] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Download size={18} />
                <span>Resources</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                  activeTab === 'notes'
                    ? 'bg-[#17362d] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen size={18} />
                <span>My Notes</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto bg-[#17362d] p-6">
              {activeTab === 'transcript' && (
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Video Transcript</h3>
                    <button className="text-sm text-primary hover:underline">
                      Download Transcript
                    </button>
                  </div>
                  {lesson.transcript.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="text-primary font-mono text-sm flex-shrink-0">
                        {item.time}
                      </span>
                      <p className="text-white/80">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="max-w-3xl">
                  <h3 className="text-lg font-bold mb-4">Downloadable Resources</h3>
                  <div className="space-y-3">
                    {lesson.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <FileText className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="font-semibold">{resource.name}</p>
                            <p className="text-sm text-white/60">{resource.size}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-[#0f241e] font-semibold rounded-lg transition-colors">
                          <Download size={18} />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="max-w-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">My Notes</h3>
                    <span className="text-sm text-white/60">Auto-saved</span>
                  </div>
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Take notes while you learn... Your notes are automatically saved."
                    className="w-full h-96 p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary resize-none"
                  />
                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-[#0f241e] font-semibold rounded-lg transition-colors">
                      Save Notes
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors">
                      Export as PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat />
    </div>
  );
};

export default LessonPlayer;
