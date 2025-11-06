import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const AIChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hello! 👋 I'm your AI instructor. How can I help you with your learning today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(window.speechSynthesis);
  const messagesEndRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Toggle voice listening
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Text-to-Speech for AI responses
  const speakText = (text) => {
    if (!voiceEnabled || !synthesisRef.current) return;

    synthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesisRef.current.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Send message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the AI response
      if (voiceEnabled) {
        speakText(aiResponse);
      }
    }, 1000);

    setInputMessage('');
  };

  // Simple AI response generator (can be replaced with actual API)
  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('progress')) {
      return "You're doing great! You've completed 3 courses and earned 1250 points. Keep up the excellent work! 🎯";
    } else if (lowerInput.includes('recommend') || lowerInput.includes('course')) {
      return "Based on your progress, I recommend starting with 'Advanced Data Structures' or 'Machine Learning Basics'. Both align well with your learning path! 📚";
    } else if (lowerInput.includes('quiz') || lowerInput.includes('help')) {
      return "I'm here to help! What specific topic are you struggling with? I can explain concepts, provide examples, or guide you through problems. 💡";
    } else if (lowerInput.includes('explain')) {
      return "I'd be happy to explain! Which concept would you like me to clarify? I can break down complex topics into simple, easy-to-understand explanations. 🎓";
    } else {
      return "That's an interesting question! I'm here to assist you with your courses, track your progress, and help you achieve your learning goals. What would you like to know more about? 😊";
    }
  };

  // Quick action buttons
  const quickActions = [
    { text: "Explain a concept", icon: "💡" },
    { text: "Review my progress", icon: "📊" },
    { text: "Recommend courses", icon: "📚" },
    { text: "Help with quiz", icon: "❓" }
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  return (
    <>
      {/* Floating AI Chat Button */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 group"
        animate={{ 
          y: isChatOpen ? 1000 : 0,
          opacity: isChatOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {/* Pulsing rings */}
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-500 rounded-full"
          ></motion.div>
          
          {/* Avatar with gradient border */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-cyan-500 p-1">
            <div 
              className="w-full h-full rounded-full bg-center bg-cover border-2 border-white dark:border-[#0f231e]"
              style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCX7lDP50eNWCqPqh45Ak0Acd_fNGA9bHz-Twwui_72m-O2yl3s6VhQAWv3-e2kLULCavycAe2oLJTimsvkaEBBM6gLH16QA1l-22QeciY58ua2JJK4U_XIBUh8-yi4PBVpSUrG-0l5LAQFW16RGddi5Ohmw6deaUCnBxh_-Atj9cKf8_GXuL9ct01wOpKKhjYt2OC17vnMfARwE1Zk-NoRK-nwJn8IkhvnCNNZ4wFVqMgfOnHTLOTjsMolXtldqIidYfnEyE9AtqY')`}}
            ></div>
          </div>
          
          {/* Message icon badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0f231e]">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
        </div>
      </motion.button>

      {/* AI Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] z-50 flex flex-col bg-white dark:bg-[#17362d] rounded-2xl shadow-2xl border border-gray-200 dark:border-primary/20 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="relative bg-gradient-to-r from-primary to-cyan-500 p-4 flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-12 h-12 rounded-full bg-center bg-cover border-2 border-white"
                style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCX7lDP50eNWCqPqh45Ak0Acd_fNGA9bHz-Twwui_72m-O2yl3s6VhQAWv3-e2kLULCavycAe2oLJTimsvkaEBBM6gLH16QA1l-22QeciY58ua2JJK4U_XIBUh8-yi4PBVpSUrG-0l5LAQFW16RGddi5Ohmw6deaUCnBxh_-Atj9cKf8_GXuL9ct01wOpKKhjYt2OC17vnMfARwE1Zk-NoRK-nwJn8IkhvnCNNZ4wFVqMgfOnHTLOTjsMolXtldqIidYfnEyE9AtqY')`}}
              ></motion.div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">AI Instructor</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <p className="text-white/90 text-xs">Online - Ready to help!</p>
                </div>
              </div>
              
              {/* Voice toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (isSpeaking) stopSpeaking();
                }}
                className="text-white/90 hover:text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
                title={voiceEnabled ? "Disable voice" : "Enable voice"}
              >
                {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsChatOpen(false);
                  stopSpeaking();
                }}
                className="text-white/90 hover:text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0f231e]">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'ai' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex-shrink-0"></div>
                  )}
                  <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                    <div className={`${
                      message.type === 'ai' 
                        ? 'bg-white dark:bg-[#204b40] rounded-2xl rounded-tl-none' 
                        : 'bg-gradient-to-r from-primary to-cyan-500 rounded-2xl rounded-tr-none'
                    } p-3 shadow-sm max-w-[85%]`}>
                      <p className={`${
                        message.type === 'ai' 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-[#0f241e]'
                      } text-sm`}>
                        {message.text}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Speaking indicator */}
              {isSpeaking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-primary"
                >
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="text-xs font-semibold">AI is speaking...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />

              {/* Quick Actions - Show only at start */}
              {messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2 px-2"
                >
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction(action.text)}
                      className="px-3 py-2 bg-white dark:bg-[#204b40] text-gray-900 dark:text-white text-xs font-semibold rounded-lg border border-gray-200 dark:border-primary/20 hover:border-primary hover:text-primary transition-colors"
                    >
                      {action.icon} {action.text}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white dark:bg-[#17362d] border-t border-gray-200 dark:border-primary/20">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleVoiceInput}
                  className={`p-3 rounded-xl transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
                      : 'bg-gray-100 dark:bg-[#0f231e] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#204b40]'
                  }`}
                  title={isListening ? "Stop recording" : "Voice input"}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </motion.button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening..." : "Ask me anything..."}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-[#0f231e] text-gray-900 dark:text-white rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-gradient-to-r from-primary to-cyan-500 text-[#0f241e] rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>

              {isListening && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-xs"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-red-500"
                  ></motion.div>
                  Recording... Speak now
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
