import { useState } from 'react';
import { aiAPI } from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const AITeacher = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI teaching assistant. Ask me any questions about your courses, and I\'ll do my best to help you understand the material.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiAPI.ask(input);
      const aiMessage: Message = {
        role: 'assistant',
        content: response.data.answer,
        timestamp: response.data.timestamp,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
            <div className="bg-blue-600 text-white p-6">
              <h1 className="text-2xl font-bold mb-2">🧠 AI Teaching Assistant</h1>
              <p className="text-blue-100">
                Ask me anything about your courses and I'll help you learn!
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                💡 Try asking: "Explain JavaScript arrays" or "What is React?"
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITeacher;
