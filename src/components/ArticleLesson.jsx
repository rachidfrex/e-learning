import React from 'react';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';

const ArticleLesson = ({ lesson }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-[#0f231e]">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              {lesson.moduleTitle}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-[#8dcebd]">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{lesson.readTime || '10 min read'}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{lesson.wordCount || '2,500'} words</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {lesson.featuredImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img 
              src={lesson.featuredImage} 
              alt={lesson.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {lesson.content ? (
            <div 
              className="text-gray-800 dark:text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          ) : (
            // Default content if no HTML content is provided
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-6">
              <p className="text-lg">
                {lesson.description || 'Article content will be displayed here.'}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Introduction
              </h2>
              <p>
                In this lesson, we'll explore the fundamental concepts and practical applications. 
                Understanding these principles is crucial for mastering the subject matter.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
                <p className="text-blue-900 dark:text-blue-200 font-medium">
                  💡 <strong>Key Point:</strong> Pay special attention to the examples provided 
                  throughout this lesson, as they demonstrate real-world applications.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Core Concepts
              </h2>
              <p>
                Let's dive into the main concepts you need to understand. Each concept builds 
                upon the previous one, so make sure you grasp each point before moving forward.
              </p>

              <ul className="list-disc list-inside space-y-2 my-4">
                <li>First key concept: Foundation and basics</li>
                <li>Second key concept: Intermediate applications</li>
                <li>Third key concept: Advanced techniques</li>
                <li>Fourth key concept: Best practices</li>
              </ul>

              {/* Example Code Block */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                Example
              </h3>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4">
                <pre className="text-sm">
                  <code>{`# Example code snippet
def example_function():
    """
    This is a sample function to demonstrate
    the concept we're learning about.
    """
    result = "Hello, World!"
    return result

# Call the function
output = example_function()
print(output)`}</code>
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Practical Applications
              </h2>
              <p>
                Now that you understand the theory, let's look at how to apply these concepts 
                in real-world scenarios. These applications will help solidify your understanding.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-gray-50 dark:bg-[#17362d] p-4 rounded-lg border border-gray-200 dark:border-[#2e6b5b]">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Use Case 1</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Application in web development and data processing.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-[#17362d] p-4 rounded-lg border border-gray-200 dark:border-[#2e6b5b]">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Use Case 2</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Implementation in automation and scripting tasks.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 my-6">
                <p className="text-green-900 dark:text-green-200">
                  ✅ <strong>Pro Tip:</strong> Practice these concepts with the exercises 
                  provided in the resources section to reinforce your learning.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Summary
              </h2>
              <p>
                In this lesson, we covered the essential concepts and their practical applications. 
                Make sure to review the key points and complete the practice exercises before 
                moving on to the next lesson.
              </p>

              <div className="bg-gray-100 dark:bg-[#17362d] rounded-lg p-6 my-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  📝 Key Takeaways
                </h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Understand the fundamental principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Apply concepts in practical scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Practice with provided examples and exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Review the summary before proceeding</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Next Steps
              </h2>
              <p>
                Continue to the next lesson to build upon what you've learned here. Each subsequent 
                lesson will introduce new concepts while reinforcing the foundations we've established.
              </p>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#2e6b5b]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-[#8dcebd]">
              📚 Make sure you understand this lesson before moving forward
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-cyan-500 text-[#0f241e] font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleLesson;
