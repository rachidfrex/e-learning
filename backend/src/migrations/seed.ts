import pool from '../config/database';
import bcrypt from 'bcryptjs';

const seedData = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const userResult = await client.query(`
      INSERT INTO users (email, password, name, role) 
      VALUES 
        ('teacher@example.com', $1, 'Dr. Jane Smith', 'instructor'),
        ('student@example.com', $1, 'John Doe', 'student')
      RETURNING id
    `, [hashedPassword]);

    const instructorId = userResult.rows[0].id;
    const studentId = userResult.rows[1].id;

    console.log('Created sample users');

    // Create sample courses
    const courseResult = await client.query(`
      INSERT INTO courses (title, description, instructor_id, level, duration_minutes) 
      VALUES 
        (
          'Introduction to JavaScript',
          'Learn the fundamentals of JavaScript programming including variables, functions, arrays, and objects. Perfect for beginners!',
          $1,
          'Beginner',
          240
        ),
        (
          'React for Beginners',
          'Build modern web applications with React. Learn components, hooks, state management, and more.',
          $1,
          'Intermediate',
          300
        ),
        (
          'Node.js & Express',
          'Create powerful backend APIs with Node.js and Express. Includes database integration and authentication.',
          $1,
          'Intermediate',
          360
        )
      RETURNING id
    `, [instructorId]);

    const courseIds = courseResult.rows.map(row => row.id);
    console.log('Created sample courses');

    // Enroll student in first course
    await client.query(`
      INSERT INTO enrollments (user_id, course_id) 
      VALUES ($1, $2)
    `, [studentId, courseIds[0]]);

    // Create sample lessons for JavaScript course
    await client.query(`
      INSERT INTO lessons (course_id, title, content, transcript, order_number, duration_minutes) 
      VALUES 
        (
          $1,
          'Getting Started with JavaScript',
          'Welcome to JavaScript! In this lesson, you will learn:\n\n1. What is JavaScript?\n2. Setting up your development environment\n3. Your first JavaScript program\n4. Variables and data types\n\nJavaScript is a versatile programming language used primarily for web development. It allows you to create interactive and dynamic content on websites.',
          'Hello and welcome to our JavaScript course. Today we will start with the basics of JavaScript programming...',
          1,
          30
        ),
        (
          $1,
          'Variables and Data Types',
          'Understanding variables and data types:\n\n1. Declaring variables with let, const, and var\n2. Primitive data types: string, number, boolean\n3. Complex data types: objects, arrays\n4. Type conversion and coercion\n\nVariables are containers for storing data values. In JavaScript, you can declare variables using let, const, or var keywords.',
          'In this lesson, we will explore how to work with variables and different data types in JavaScript...',
          2,
          35
        ),
        (
          $1,
          'Functions and Control Flow',
          'Learn about functions and control structures:\n\n1. Function declarations and expressions\n2. Arrow functions\n3. If/else statements\n4. Loops: for, while, forEach\n5. Switch statements\n\nFunctions are reusable blocks of code that perform specific tasks.',
          'Functions are one of the fundamental building blocks in JavaScript. Let us learn how to create and use them...',
          3,
          40
        )
    `, [courseIds[0]]);

    console.log('Created sample lessons');

    // Create sample quiz for JavaScript course
    const quizResult = await client.query(`
      INSERT INTO quizzes (course_id, title, description, passing_score) 
      VALUES (
        $1,
        'JavaScript Fundamentals Quiz',
        'Test your knowledge of JavaScript basics',
        70
      )
      RETURNING id
    `, [courseIds[0]]);

    const quizId = quizResult.rows[0].id;

    // Create quiz questions
    await client.query(`
      INSERT INTO questions (quiz_id, question_text, question_type, options, correct_answer, points, order_number) 
      VALUES 
        (
          $1,
          'Which keyword is used to declare a constant variable in JavaScript?',
          'multiple_choice',
          '["var", "let", "const", "static"]',
          'const',
          1,
          1
        ),
        (
          $1,
          'What is the result of: typeof []',
          'multiple_choice',
          '["array", "object", "list", "Array"]',
          'object',
          1,
          2
        ),
        (
          $1,
          'Which method adds an element to the end of an array?',
          'multiple_choice',
          '["push()", "pop()", "shift()", "unshift()"]',
          'push()',
          1,
          3
        ),
        (
          $1,
          'What does === operator do in JavaScript?',
          'multiple_choice',
          '["Assigns a value", "Compares values with type coercion", "Compares values without type coercion", "Creates a function"]',
          'Compares values without type coercion',
          1,
          4
        ),
        (
          $1,
          'Which of the following is NOT a primitive data type in JavaScript?',
          'multiple_choice',
          '["string", "number", "boolean", "array"]',
          'array',
          1,
          5
        )
    `, [quizId]);

    console.log('Created sample quiz and questions');

    // Create sample lessons for React course
    await client.query(`
      INSERT INTO lessons (course_id, title, content, transcript, order_number, duration_minutes) 
      VALUES 
        (
          $1,
          'Introduction to React',
          'Welcome to React! Learn about:\n\n1. What is React?\n2. Why use React?\n3. Setting up a React project\n4. Your first React component\n\nReact is a popular JavaScript library for building user interfaces.',
          'Welcome to React for Beginners. In this first lesson, we will introduce you to React and its core concepts...',
          1,
          25
        ),
        (
          $1,
          'Components and Props',
          'Understanding React components:\n\n1. Function components vs Class components\n2. JSX syntax\n3. Props and prop types\n4. Component composition\n\nComponents are the building blocks of React applications.',
          'Components are at the heart of React. Let us learn how to create and use them effectively...',
          2,
          30
        )
    `, [courseIds[1]]);

    // Create sample lessons for Node.js course
    await client.query(`
      INSERT INTO lessons (course_id, title, content, transcript, order_number, duration_minutes) 
      VALUES 
        (
          $1,
          'Introduction to Node.js',
          'Get started with Node.js:\n\n1. What is Node.js?\n2. Installing Node.js and npm\n3. Creating your first Node.js application\n4. Understanding modules\n\nNode.js is a JavaScript runtime built on Chrome''s V8 engine.',
          'Welcome to Node.js development. Today we will set up our environment and create our first application...',
          1,
          30
        )
    `, [courseIds[2]]);

    await client.query('COMMIT');
    console.log('Database seeded successfully!');
    console.log('\nSample credentials:');
    console.log('Instructor - Email: teacher@example.com, Password: password123');
    console.log('Student - Email: student@example.com, Password: password123');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    client.release();
  }
};

export default seedData;
