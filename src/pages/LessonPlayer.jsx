import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Settings, Maximize, Volume2, Play, Pause,
  FileText, Download, BookOpen, MessageCircle, CheckCircle, Lock,
  List, X, Menu
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

  // Mock lesson data - can be 'video' or 'article'
  const lesson = {
    id: 1,
    type: lessonId === '5' ? 'article' : 'video', // Demo: lesson 5 is an article, others are videos
    title: lessonId === '5' ? 'Military Communication Protocols' : 'Introduction to Military Correspondence',
    courseTitle: lessonId === '1' ? 'Introduction to English' : 'Military Correspondence Fundamentals',
    courseSlug: lessonId === '1' ? 'introduction-to-english' : 'military-correspondence-fundamentals',
    moduleTitle: lessonId === '1' ? 'Basic English Communication' : 'Official Documentation',
    videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
    duration: '15:30',
    readTime: '10 min',
    wordCount: '2,500',
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop',
    description: lessonId === '1' 
      ? 'Learn essential English communication skills for military personnel' 
      : 'Learn the fundamentals of military correspondence, protocols, and official documentation.',
    completed: false,
    content: lessonId === '5' ? `
      <h2>Military Communication Protocols</h2>
      <p>Effective communication is essential in military operations. This lesson covers the key protocols and procedures for military communications.</p>
      
      <h3>1. Radio Communication Standards</h3>
      <p>Military radio communication follows strict protocols:</p>
      <ul>
        <li><strong>Brevity Codes</strong> - Short, standardized phrases for quick communication</li>
        <li><strong>Phonetic Alphabet</strong> - NATO phonetic alphabet for clarity (Alpha, Bravo, Charlie...)</li>
        <li><strong>Call Signs</strong> - Unique identifiers for units and personnel</li>
      </ul>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code># Radio Communication Example

Sender: "Alpha One to Bravo Two, over"
Receiver: "Bravo Two, go ahead, over"
Sender: "Request status report, over"
Receiver: "Status green, mission complete, over"
Sender: "Roger that, return to base, out"</code></pre>
      </div>

      <h3>2. Written Communication Standards</h3>
      <p>Military written correspondence must be clear, concise, and formal:</p>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code>OFFICIAL MEMORANDUM

FROM: Commander, Unit Alpha
TO: All Personnel
DATE: [Current Date]
SUBJECT: Communication Protocol Update

1. All radio communications will use NATO phonetic alphabet
2. Daily status reports required by 1800 hours
3. Emergency channels to remain clear except for urgent traffic

[Commander's Signature]</code></pre>
      </div>

      <h3>3. Chain of Command Communication</h3>
      <p>Follow proper chain of command when communicating:</p>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code>Communication Flow:

Commander
    ↓
Executive Officer
    ↓
Operations Officer
    ↓
Unit Leaders
    ↓
Personnel

Note: Emergency situations may bypass normal channels</code></pre>
      </div>

      <h3>4. Security Classifications</h3>
      <p>All military communications must be properly classified:</p>
      <ul>
        <li><strong>UNCLASSIFIED</strong> - Public information</li>
        <li><strong>CONFIDENTIAL</strong> - Limited distribution</li>
        <li><strong>SECRET</strong> - Serious damage if disclosed</li>
        <li><strong>TOP SECRET</strong> - Grave damage if disclosed</li>
      </ul>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code>Classification Markings:

[CLASSIFICATION LEVEL]
Document Title
Date: [Current Date]

Content goes here...

[CLASSIFICATION LEVEL]</code></pre>
      </div>

      <h3>5. Digital Communication Security</h3>
      <p>Modern military communications require cybersecurity awareness:</p>
      <ul>
        <li>Use encrypted channels for sensitive information</li>
        <li>Never share passwords or access codes over unsecured networks</li>
        <li>Report suspicious communications immediately</li>
        <li>Follow proper authentication procedures</li>
      </ul>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code>Security Checklist:

☑ Verify recipient identity
☑ Check classification level
☑ Use secure transmission method
☑ Confirm receipt
☑ Destroy sensitive materials properly</code></pre>
      </div>

      <h3>Best Practices Summary</h3>
      <p>Remember these key principles for military communications:</p>
      <ul>
        <li>Be clear and concise</li>
        <li>Follow proper protocols and chain of command</li>
        <li>Maintain security at all times</li>
        <li>Document all important communications</li>
        <li>Practice operational security (OPSEC)</li>
      </ul>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code>REMEMBER:
- Clear Communication Saves Lives
- Security Is Everyone's Responsibility
- When In Doubt, Ask For Clarification
- Document Everything Important</code></pre>
      </div>
    ` : null,
    transcript: [
      { time: '0:00', text: 'Welcome to this lesson on military correspondence. In this video, we\'ll cover the fundamentals of official military documentation.' },
      { time: '0:15', text: 'Military correspondence follows strict protocols and formats. Understanding these standards is essential for effective communication.' },
      { time: '0:35', text: 'We\'ll begin with the basic structure of a military memorandum and official letters.' },
      { time: '0:50', text: 'Every military document must include proper headers: FROM, TO, DATE, and SUBJECT lines.' },
      { time: '1:10', text: 'The language used must be clear, concise, and professional at all times.' },
      { time: '1:30', text: 'For example, when writing a status report, always use present tense and active voice.' },
      { time: '1:50', text: 'Classification markings are critical. All documents must be properly marked according to their security level.' },
      { time: '2:10', text: 'Let\'s discuss the proper chain of command for routing correspondence.' },
      { time: '2:30', text: 'Documents must follow the established hierarchy and receive appropriate approvals.' },
      { time: '2:50', text: 'Here are key principles: accuracy, brevity, clarity, and proper format are essential for military correspondence.' }
    ],
    resources: [
      { id: 1, name: 'Military Correspondence Guide.pdf', size: '3.2 MB', type: 'pdf' },
      { id: 2, name: 'Official Letter Templates.zip', size: '245 KB', type: 'zip' },
      { id: 3, name: 'Communication Protocol Manual.pdf', size: '4.1 MB', type: 'pdf' }
    ],
    nextLesson: {
      id: 2,
      title: 'Official Report Writing',
      locked: false
    },
    previousLesson: {
      id: 0,
      title: 'Course Introduction',
      locked: false
    }
  };

  // Mock curriculum for sidebar
  const curriculum = [
    {
      id: 1,
      title: lessonId === '1' ? 'English Fundamentals' : 'Course Introduction',
      lessons: [
        { id: 1, title: lessonId === '1' ? 'English Basics' : 'Welcome to Military Correspondence', duration: '5:30', type: 'video', completed: true },
        { id: 2, title: lessonId === '1' ? 'English Grammar Introduction' : 'Understanding Military Documentation', duration: '8:45', type: 'video', completed: true },
        { id: 3, title: lessonId === '1' ? 'Basic English Vocabulary' : 'Your First Official Letter', duration: '6:20', type: 'video', completed: true }
      ]
    },
    {
      id: 2,
      title: lessonId === '1' ? 'English Communication' : 'Official Documentation',
      lessons: [
        { id: 4, title: lessonId === '1' ? 'English Conversation Practice' : 'Introduction to Military Correspondence', duration: '15:30', type: 'video', completed: false, current: true },
        { id: 5, title: lessonId === '1' ? 'English Writing Skills' : 'Military Communication Protocols', duration: '10 min read', type: 'article', completed: false, locked: false },
        { id: 6, title: lessonId === '1' ? 'English Pronunciation' : 'Report Writing Standards', duration: '18:30', type: 'video', completed: false, locked: false },
        { id: 7, title: lessonId === '1' ? 'English Listening Comprehension' : 'Memorandum Formats', duration: '10:45', type: 'video', completed: false, locked: false }
      ]
    },
    {
      id: 3,
      title: lessonId === '1' ? 'Advanced English' : 'Communication Procedures',
      lessons: [
        { id: 8, title: lessonId === '1' ? 'Advanced Grammar' : 'Radio Communication Procedures', duration: '14:20', completed: false, locked: false },
        { id: 9, title: lessonId === '1' ? 'Business English' : 'Chain of Command Protocol', duration: '16:30', completed: false, locked: false },
        { id: 10, title: lessonId === '1' ? 'English for Presentations' : 'Security Classifications', duration: '12:10', completed: false, locked: false }
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
            <span className="hidden md:inline">Back to Course</span>
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
              {/* Video Player */}
              <div className="relative bg-black aspect-video">
                {/* Video embed - in production, use proper video player */}
                <iframe
                  className="w-full h-full"
                  src={lesson.videoUrl}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Custom Controls Overlay (optional) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
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
