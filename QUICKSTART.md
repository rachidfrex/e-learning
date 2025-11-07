# Quick Start Guide

This guide will help you get the e-learning platform up and running quickly.

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

## Quick Setup (5 minutes)

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd e-learning

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Configure Environment

**Backend (.env in root directory):**
```bash
cp .env.example .env
```

Edit `.env` and set:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=your_secret_key_at_least_32_characters_long
JWT_EXPIRE=7d
NODE_ENV=development
```

**Frontend (frontend/.env):**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in `.env`

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
# From project root
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB connected successfully
```

**Terminal 2 - Frontend:**
```bash
# From project root
cd frontend
npm start
```

Browser will open automatically at `http://localhost:3000`

## First Steps

### 1. Create Your First Account

1. Navigate to `http://localhost:3000`
2. Click "Register"
3. Fill in the form:
   - Choose "Student" to explore courses
   - Choose "Instructor" to create courses
4. Click "Register"

### 2. As a Student

1. Browse courses at `/courses`
2. Click on a course to view details
3. Click "Enroll Now"
4. Start learning!
5. View your progress at `/dashboard`

### 3. As an Instructor

1. Go to `/instructor`
2. Click "Create New Course"
3. Fill in course details and add lessons
4. Publish your course
5. Students can now enroll!

### 4. Create an Admin Account

Since there's no admin registration option, you need to manually update the database:

```bash
# Connect to MongoDB
mongosh elearning

# Update a user to admin
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

Now login and access `/admin` for the admin dashboard.

## Testing the Features

### Test User Authentication
1. Register a new account
2. Logout
3. Login with credentials
4. Access protected routes

### Test Course Creation (as Instructor)
1. Login as instructor
2. Create a new course with:
   - Title, description, category
   - Multiple lessons
   - Quiz questions
3. Publish the course

### Test Course Enrollment (as Student)
1. Login as student
2. Browse and enroll in a course
3. Take lessons and quizzes
4. Ask the AI teacher questions
5. Check progress dashboard

### Test Admin Functions (as Admin)
1. Login as admin
2. View platform analytics
3. Manage users and roles
4. Monitor courses

## API Testing

You can also test the API directly:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Courses
```bash
curl http://localhost:5000/api/courses
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check Atlas connection
- Verify `MONGODB_URI` in `.env` is correct

### Port Already in Use
```bash
# Change port in .env
PORT=5001

# Or kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Frontend Not Connecting to Backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `frontend/.env`
- Clear browser cache and refresh

### Dependencies Issues
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Sample Data

To quickly test the platform, you can insert sample data:

```javascript
// In MongoDB shell
use elearning

// Sample course
db.courses.insertOne({
  title: "Introduction to JavaScript",
  description: "Learn JavaScript from scratch",
  instructor: ObjectId("your-instructor-id"),
  category: "programming",
  level: "beginner",
  published: true,
  lessons: [{
    title: "Variables and Data Types",
    content: "Learn about variables in JavaScript...",
    duration: 15,
    order: 0,
    quiz: {
      questions: [{
        question: "What keyword declares a constant?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2,
        explanation: "const is used to declare constants"
      }]
    }
  }],
  enrolledStudents: [],
  createdAt: new Date()
})
```

## Next Steps

- Customize the UI theme
- Add more course categories
- Integrate with real AI service (OpenAI)
- Deploy to production

## Need Help?

- Check the main README.md for detailed documentation
- Review SECURITY.md for security best practices
- Open an issue on GitHub for bugs

Happy Learning! 🎓
