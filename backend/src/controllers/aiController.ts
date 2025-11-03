import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';

// Mock AI responses - In production, this would call OpenAI API
const mockAIResponses = [
  "That's a great question! Let me help you understand this concept better.",
  "Based on the course material, here's what you need to know:",
  "I can explain that concept in simpler terms for you.",
  "Let's break this down step by step to make it clearer.",
  "This is an important topic in the course. Here's a detailed explanation:",
];

const contextualResponses: { [key: string]: string } = {
  'javascript': "JavaScript is a versatile programming language used primarily for web development. It allows you to create interactive and dynamic content on websites.",
  'react': "React is a popular JavaScript library for building user interfaces. It uses a component-based architecture and virtual DOM for efficient rendering.",
  'node': "Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows you to run JavaScript on the server side and build scalable network applications.",
  'database': "Databases are organized collections of data that can be easily accessed, managed, and updated. Common types include SQL (relational) and NoSQL databases.",
  'api': "An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other.",
};

export const askAITeacher = async (req: AuthRequest, res: Response) => {
  try {
    const { question, courseContext } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate mock response based on keywords
    let response = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
    
    const lowerQuestion = question.toLowerCase();
    for (const [keyword, contextResponse] of Object.entries(contextualResponses)) {
      if (lowerQuestion.includes(keyword)) {
        response = contextResponse;
        break;
      }
    }

    // If using OpenAI API in production:
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     { role: "system", content: "You are a helpful e-learning teacher assistant." },
    //     { role: "user", content: question }
    //   ],
    // });
    // response = completion.choices[0].message.content;

    res.json({
      question,
      answer: response,
      timestamp: new Date().toISOString(),
      model: 'mock-llm-v1', // In production: 'gpt-3.5-turbo'
    });
  } catch (error) {
    console.error('AI teacher error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
  try {
    // In a production app, this would fetch chat history from database/cache
    res.json({
      history: [],
      message: 'Chat history feature coming soon',
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};
