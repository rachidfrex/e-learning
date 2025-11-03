# E-Learning Platform

A full-stack e-learning web application with Express.js backend and React frontend. Features include course management, video lessons, quizzes, progress tracking, and an AI-powered teaching assistant.

## 🚀 Features

- **Authentication**: JWT-based user registration and login
- **Course Management**: Full CRUD operations for courses
- **Lesson Player**: Video lessons with transcripts and content
- **Quiz Engine**: Multiple-choice quizzes with automatic grading
- **Progress Tracking**: Monitor student progress across courses
- **AI Teaching Assistant**: Interactive chatbot for student questions (mock LLM)
- **Student Dashboard**: Personalized learning dashboard with progress metrics

## 📁 Project Structure

```
e-learning/
├── backend/                # Express.js API server
│   ├── src/
│   │   ├── config/        # Database and Redis configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── migrations/    # Database migrations
│   │   └── tests/         # Unit tests
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── utils/         # Utility functions
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml     # Docker orchestration
```

## 🛠️ Technology Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript**
- **PostgreSQL** (database)
- **Redis** (caching)
- **JWT** (authentication)
- **bcryptjs** (password hashing)
- **Jest** (testing)

### Frontend
- **React 18**
- **Vite** (build tool)
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **Axios** (HTTP client)

### DevOps
- **Docker** & **Docker Compose**
- **PostgreSQL 16**
- **Redis 7**

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development without Docker)
- npm or yarn

## 🚀 Quick Start with Docker

### Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-learning
   ```

2. **Run the setup script**
   ```bash
   ./setup.sh
   ```
   
   This script will:
   - Check Docker and Docker Compose installation
   - Create environment files from examples
   - Start all services
   - Run database migrations
   - Seed the database with sample data

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Health: http://localhost:3001/health

4. **Login with sample credentials**
   - Instructor: `teacher@example.com` / `password123`
   - Student: `student@example.com` / `password123`

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-learning
   ```

2. **Create environment files**
   
   Backend `.env` (create in `backend/` directory):
   ```env
   PORT=3001
   NODE_ENV=development
   
   DB_HOST=postgres
   DB_PORT=5432
   DB_NAME=elearning
   DB_USER=elearning_user
   DB_PASSWORD=elearning_pass
   
   REDIS_HOST=redis
   REDIS_PORT=6379
   
   JWT_SECRET=your-secret-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   OPENAI_API_KEY=your-openai-api-key-here
   ```

   Frontend `.env` (create in `frontend/` directory):
   ```env
   VITE_API_URL=http://localhost:3001
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**
   ```bash
   docker-compose exec backend npm run migrate
   ```

5. **Seed database with sample data (optional)**
   ```bash
   docker-compose exec backend npm run seed
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Health: http://localhost:3001/health

## 🔧 Local Development (without Docker)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL and Redis**
   - Install PostgreSQL and create database `elearning`
   - Install Redis and start the service
   - Update `.env` with local connection details

4. **Run migrations**
   ```bash
   npm run migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Run specific test file
```bash
npm test -- quiz.test.ts
```

### Generate coverage report
```bash
npm test -- --coverage
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (authenticated)

### Course Endpoints

- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (authenticated)
- `PUT /api/courses/:id` - Update course (authenticated)
- `DELETE /api/courses/:id` - Delete course (authenticated)
- `POST /api/courses/:id/enroll` - Enroll in course (authenticated)
- `GET /api/courses/enrolled` - Get enrolled courses (authenticated)

### Lesson Endpoints

- `GET /api/lessons/course/:courseId` - Get course lessons
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons` - Create lesson (authenticated)
- `PUT /api/lessons/:id` - Update lesson (authenticated)
- `DELETE /api/lessons/:id` - Delete lesson (authenticated)
- `POST /api/lessons/:id/complete` - Mark lesson complete (authenticated)

### Quiz Endpoints

- `GET /api/quizzes/course/:courseId` - Get course quizzes
- `GET /api/quizzes/:id` - Get quiz with questions
- `POST /api/quizzes` - Create quiz (authenticated)
- `POST /api/quizzes/questions` - Add question to quiz (authenticated)
- `POST /api/quizzes/:id/attempt` - Submit quiz attempt (authenticated)
- `GET /api/quizzes/:id/attempts` - Get user's quiz attempts (authenticated)

### Progress Endpoints

- `GET /api/progress/dashboard` - Get user dashboard (authenticated)
- `GET /api/progress/course/:courseId` - Get course progress (authenticated)

### AI Teacher Endpoints

- `POST /api/ai/ask` - Ask AI teacher a question (authenticated)
- `GET /api/ai/history` - Get chat history (authenticated)

## 🗄️ Database Schema

### Tables

- **users** - User accounts
- **courses** - Course information
- **lessons** - Lesson content
- **quizzes** - Quiz metadata
- **questions** - Quiz questions
- **quiz_attempts** - Student quiz submissions
- **user_progress** - Progress tracking
- **enrollments** - Course enrollments

## 🤖 AI Teacher

The AI teacher endpoint currently returns mock responses. To integrate with OpenAI:

1. Sign up for OpenAI API at https://platform.openai.com/
2. Get your API key
3. Add to `.env`: `OPENAI_API_KEY=sk-...`
4. Uncomment OpenAI integration code in `backend/src/controllers/aiController.ts`
5. Install OpenAI SDK: `npm install openai`

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP security headers with Helmet
- CORS configuration
- Input validation
- SQL injection prevention (parameterized queries)

## 📦 Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Docker Production Build
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify network connectivity in Docker

### Redis Connection Issues
- Ensure Redis is running
- Check Redis host and port configuration

### Port Already in Use
- Change ports in `docker-compose.yml`
- Or stop conflicting services

### Migration Errors
- Ensure database is running
- Check database permissions
- Drop and recreate database if needed

## 📝 Sample Data

The project includes a seed script that populates the database with sample data:

```bash
# Using Docker
docker-compose exec backend npm run seed

# Local development
cd backend
npm run seed
```

This creates:
- 2 sample users (instructor and student)
- 3 sample courses (JavaScript, React, Node.js)
- Multiple lessons for each course
- A sample quiz with questions

### Sample Credentials
- **Instructor**: `teacher@example.com` / `password123`
- **Student**: `student@example.com` / `password123`

You can also use the API to create your own data:

```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"password123","name":"John Doe"}'

# Create a course (use token from registration)
curl -X POST http://localhost:3001/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Introduction to Python","description":"Learn Python from scratch","level":"Beginner","duration_minutes":180}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 👥 Authors

- Your Name

## 🙏 Acknowledgments

- Express.js team
- React team
- Tailwind CSS team
- PostgreSQL community
- Redis community

## 📧 Support

For support, email support@elearning.com or open an issue in the repository. 
