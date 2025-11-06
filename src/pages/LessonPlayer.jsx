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
    title: lessonId === '5' ? 'Understanding Python Data Types' : 'Introduction to Python Variables',
    courseTitle: 'Complete Python Bootcamp',
    courseSlug: 'python-complete-bootcamp',
    moduleTitle: 'Python Basics',
    videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
    duration: '15:30',
    readTime: '10 min',
    wordCount: '2,500',
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop',
    description: 'Learn the fundamentals of Python variables, how to declare them, and best practices for naming conventions.',
    completed: false,
    content: lessonId === '5' ? `
      <h2>Understanding Python Data Types</h2>
      <p>Python has several built-in data types that are essential for programming. In this lesson, we'll explore the most commonly used types.</p>
      
      <h3>1. Numeric Types</h3>
      <p>Python supports three numeric types:</p>
      <ul>
        <li><strong>int</strong> - Integer numbers (e.g., 5, -3, 1000)</li>
        <li><strong>float</strong> - Floating point numbers (e.g., 3.14, -0.5, 2.0)</li>
        <li><strong>complex</strong> - Complex numbers (e.g., 3+5j)</li>
      </ul>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code># Examples of numeric types
x = 5          # int
y = 3.14       # float
z = 1 + 2j     # complex

print(type(x))  # Output: <class 'int'>
print(type(y))  # Output: <class 'float'>
print(type(z))  # Output: <class 'complex'></code></pre>
      </div>

      <h3>2. String Type</h3>
      <p>Strings are sequences of characters enclosed in quotes. You can use single, double, or triple quotes.</p>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code># String examples
name = "Alice"
message = 'Hello, World!'
multiline = """This is a
multiline
string"""

print(name)      # Output: Alice
print(len(name)) # Output: 5</code></pre>
      </div>

      <h3>3. Boolean Type</h3>
      <p>Boolean values represent True or False. They are often used in conditional statements.</p>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code># Boolean examples
is_student = True
has_graduated = False

print(5 > 3)     # Output: True
print(10 == 5)   # Output: False</code></pre>
      </div>

      <h3>4. Collection Types</h3>
      <p>Python provides several collection types for storing multiple values:</p>
      <ul>
        <li><strong>List</strong> - Ordered, mutable collection</li>
        <li><strong>Tuple</strong> - Ordered, immutable collection</li>
        <li><strong>Set</strong> - Unordered collection of unique elements</li>
        <li><strong>Dictionary</strong> - Key-value pairs</li>
      </ul>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code># Collection examples
my_list = [1, 2, 3, 4, 5]
my_tuple = (1, 2, 3)
my_set = {1, 2, 3, 4, 5}
my_dict = {"name": "Alice", "age": 25}

print(my_list[0])   # Output: 1
print(my_dict["name"]) # Output: Alice</code></pre>
      </div>

      <h3>Type Conversion</h3>
      <p>You can convert between different data types using built-in functions:</p>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code># Type conversion examples
x = 5           # int
y = float(x)    # Convert to float: 5.0
z = str(x)      # Convert to string: "5"

a = "123"
b = int(a)      # Convert string to int: 123

print(type(y))  # Output: <class 'float'>
print(type(z))  # Output: <class 'str'></code></pre>
      </div>

      <h3>Checking Data Types</h3>
      <p>Use the <code>type()</code> function to check the data type of any variable:</p>

      <div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4">
        <pre><code># Checking types
x = 5
print(type(x))           # Output: <class 'int'>

y = "Hello"
print(type(y))           # Output: <class 'str'>

z = [1, 2, 3]
print(isinstance(z, list))  # Output: True</code></pre>
      </div>
    ` : null,
    transcript: [
      { time: '0:00', text: 'Welcome to this lesson on Python variables. In this video, we\'ll cover everything you need to know about variables in Python.' },
      { time: '0:15', text: 'A variable is a container for storing data values. Unlike other programming languages, Python has no command for declaring a variable.' },
      { time: '0:35', text: 'A variable is created the moment you first assign a value to it. Let me show you with an example.' },
      { time: '0:50', text: 'If I write x = 5, I\'ve just created a variable called x and assigned it the value 5.' },
      { time: '1:10', text: 'Variables do not need to be declared with any particular type, and can even change type after they have been set.' },
      { time: '1:30', text: 'For example, x = 4 makes x an integer, but x = "Sally" changes x to a string.' },
      { time: '1:50', text: 'Python is case-sensitive, so Variable and variable are two different variables.' },
      { time: '2:10', text: 'Let\'s talk about naming conventions. Variable names must start with a letter or underscore character.' },
      { time: '2:30', text: 'They cannot start with a number, and can only contain alpha-numeric characters and underscores.' },
      { time: '2:50', text: 'Here are some examples: my_var, _my_var, myVar, MYVAR, myvar2 are all valid variable names.' }
    ],
    resources: [
      { id: 1, name: 'Python Variables - Cheat Sheet.pdf', size: '2.4 MB', type: 'pdf' },
      { id: 2, name: 'Code Examples.zip', size: '156 KB', type: 'zip' },
      { id: 3, name: 'Practice Exercises.pdf', size: '1.8 MB', type: 'pdf' }
    ],
    nextLesson: {
      id: 2,
      title: 'Python Data Types',
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
      title: 'Course Introduction',
      lessons: [
        { id: 1, title: 'Welcome to the Course', duration: '5:30', type: 'video', completed: true },
        { id: 2, title: 'Setting Up Python', duration: '8:45', type: 'video', completed: true },
        { id: 3, title: 'Your First Python Program', duration: '6:20', type: 'video', completed: true }
      ]
    },
    {
      id: 2,
      title: 'Python Basics',
      lessons: [
        { id: 4, title: 'Introduction to Python Variables', duration: '15:30', type: 'video', completed: false, current: true },
        { id: 5, title: 'Understanding Python Data Types', duration: '10 min read', type: 'article', completed: false, locked: false },
        { id: 6, title: 'String Operations', duration: '18:30', type: 'video', completed: false, locked: false },
        { id: 7, title: 'Numbers in Python', duration: '10:45', type: 'video', completed: false, locked: false }
      ]
    },
    {
      id: 3,
      title: 'Control Flow',
      lessons: [
        { id: 8, title: 'If Statements', duration: '14:20', completed: false, locked: false },
        { id: 9, title: 'For Loops', duration: '16:30', completed: false, locked: false },
        { id: 10, title: 'While Loops', duration: '12:10', completed: false, locked: false }
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
