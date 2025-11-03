# E-Learning Platform Architecture

## System Overview

The E-Learning Platform is a full-stack web application designed to provide online courses with interactive features including video lessons, quizzes, and an AI teaching assistant.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
│                      React + Vite + Tailwind                    │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend API Server                         │
│                     Express.js + TypeScript                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Routes     │  │ Controllers  │  │  Middleware  │         │
│  │  - Auth      │──│  - Auth      │──│  - JWT Auth  │         │
│  │  - Courses   │  │  - Courses   │  │  - CORS      │         │
│  │  - Lessons   │  │  - Lessons   │  │  - Helmet    │         │
│  │  - Quizzes   │  │  - Quizzes   │  └──────────────┘         │
│  │  - Progress  │  │  - Progress  │                            │
│  │  - AI        │  │  - AI        │                            │
│  └──────────────┘  └──────────────┘                            │
│         │                  │                                     │
│         ▼                  ▼                                     │
│  ┌──────────────────────────────────────┐                      │
│  │            Models Layer               │                      │
│  │  - User    - Course   - Lesson       │                      │
│  │  - Quiz    - Question - Progress     │                      │
│  └──────────────────────────────────────┘                      │
└────────────┬────────────────────────┬───────────────────────────┘
             │                        │
             ▼                        ▼
┌────────────────────────┐  ┌──────────────────────┐
│   PostgreSQL Database  │  │    Redis Cache       │
│  - users               │  │  - Session data      │
│  - courses             │  │  - Temp storage      │
│  - lessons             │  │                      │
│  - quizzes             │  └──────────────────────┘
│  - questions           │
│  - quiz_attempts       │
│  - user_progress       │
│  - enrollments         │
└────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **React Router**: Client-side routing
- **Axios**: HTTP client

### Backend
- **Node.js 20**: Runtime environment
- **Express.js**: Web framework
- **TypeScript**: Type safety
- **PostgreSQL 16**: Primary database
- **Redis 7**: Caching layer
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Jest**: Testing framework

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## Database Schema

### Users Table
```sql
users (
  id: SERIAL PRIMARY KEY,
  email: VARCHAR(255) UNIQUE,
  password: VARCHAR(255),
  name: VARCHAR(255),
  role: VARCHAR(50),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

### Courses Table
```sql
courses (
  id: SERIAL PRIMARY KEY,
  title: VARCHAR(255),
  description: TEXT,
  instructor_id: INTEGER FK -> users(id),
  thumbnail_url: VARCHAR(500),
  duration_minutes: INTEGER,
  level: VARCHAR(50),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

### Lessons Table
```sql
lessons (
  id: SERIAL PRIMARY KEY,
  course_id: INTEGER FK -> courses(id),
  title: VARCHAR(255),
  content: TEXT,
  transcript: TEXT,
  video_url: VARCHAR(500),
  order_number: INTEGER,
  duration_minutes: INTEGER,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

### Quizzes Table
```sql
quizzes (
  id: SERIAL PRIMARY KEY,
  course_id: INTEGER FK -> courses(id),
  lesson_id: INTEGER FK -> lessons(id),
  title: VARCHAR(255),
  description: TEXT,
  passing_score: INTEGER,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

### Questions Table
```sql
questions (
  id: SERIAL PRIMARY KEY,
  quiz_id: INTEGER FK -> quizzes(id),
  question_text: TEXT,
  question_type: VARCHAR(50),
  options: JSONB,
  correct_answer: VARCHAR(255),
  points: INTEGER,
  order_number: INTEGER,
  created_at: TIMESTAMP
)
```

### Quiz Attempts Table
```sql
quiz_attempts (
  id: SERIAL PRIMARY KEY,
  quiz_id: INTEGER FK -> quizzes(id),
  user_id: INTEGER FK -> users(id),
  score: INTEGER,
  total_points: INTEGER,
  answers: JSONB,
  passed: BOOLEAN,
  started_at: TIMESTAMP,
  completed_at: TIMESTAMP
)
```

### User Progress Table
```sql
user_progress (
  id: SERIAL PRIMARY KEY,
  user_id: INTEGER FK -> users(id),
  course_id: INTEGER FK -> courses(id),
  lesson_id: INTEGER FK -> lessons(id),
  completed: BOOLEAN,
  progress_percentage: INTEGER,
  last_accessed_at: TIMESTAMP,
  completed_at: TIMESTAMP,
  UNIQUE(user_id, course_id, lesson_id)
)
```

### Enrollments Table
```sql
enrollments (
  id: SERIAL PRIMARY KEY,
  user_id: INTEGER FK -> users(id),
  course_id: INTEGER FK -> courses(id),
  enrolled_at: TIMESTAMP,
  UNIQUE(user_id, course_id)
)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/enrolled` - Get enrolled courses

### Lessons
- `GET /api/lessons/course/:courseId` - Get lessons for course
- `GET /api/lessons/:id` - Get lesson by ID
- `POST /api/lessons` - Create lesson
- `PUT /api/lessons/:id` - Update lesson
- `DELETE /api/lessons/:id` - Delete lesson
- `POST /api/lessons/:id/complete` - Mark lesson complete

### Quizzes
- `GET /api/quizzes/course/:courseId` - Get quizzes for course
- `GET /api/quizzes/:id` - Get quiz with questions
- `POST /api/quizzes` - Create quiz
- `POST /api/quizzes/questions` - Add question
- `POST /api/quizzes/:id/attempt` - Submit quiz attempt
- `GET /api/quizzes/:id/attempts` - Get user attempts

### Progress
- `GET /api/progress/dashboard` - Get user dashboard
- `GET /api/progress/course/:courseId` - Get course progress

### AI Teacher
- `POST /api/ai/ask` - Ask AI a question
- `GET /api/ai/history` - Get chat history

## Security Features

1. **Authentication**: JWT-based with bcrypt password hashing
2. **Authorization**: Role-based access control (student/instructor)
3. **Input Validation**: Express-validator for request validation
4. **Security Headers**: Helmet.js for HTTP security headers
5. **CORS**: Configured CORS for cross-origin requests
6. **SQL Injection Prevention**: Parameterized queries
7. **Password Storage**: Bcrypt with salt rounds

## Data Flow

### User Authentication Flow
1. User submits credentials
2. Backend validates credentials
3. Password compared using bcrypt
4. JWT token generated and returned
5. Token stored in localStorage
6. Token sent with subsequent requests
7. Middleware validates token

### Course Enrollment Flow
1. User browses available courses
2. User clicks enroll button
3. API creates enrollment record
4. User redirected to course details
5. Progress tracking initialized

### Quiz Submission Flow
1. User answers quiz questions
2. Frontend collects answers
3. Answers submitted to backend
4. Backend fetches correct answers
5. Score calculated
6. Results saved to database
7. Results returned to frontend
8. User sees detailed results

### Lesson Progress Flow
1. User views lesson
2. User clicks "Mark Complete"
3. Progress record updated/created
4. Dashboard statistics updated
5. User sees updated progress

## Deployment Architecture

```
┌──────────────────────────────────────────────────┐
│              Docker Host                         │
│  ┌────────────────────────────────────────────┐ │
│  │  Frontend Container (Node:20-alpine)       │ │
│  │  - Vite dev server on port 3000            │ │
│  └────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────┐ │
│  │  Backend Container (Node:20-alpine)        │ │
│  │  - Express server on port 3001             │ │
│  └────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────┐ │
│  │  PostgreSQL Container (postgres:16-alpine) │ │
│  │  - Database on port 5432                   │ │
│  └────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────┐ │
│  │  Redis Container (redis:7-alpine)          │ │
│  │  - Cache on port 6379                      │ │
│  └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

## Performance Considerations

1. **Database Indexing**: Indexes on foreign keys and frequently queried columns
2. **Caching**: Redis for session data and temporary storage
3. **Connection Pooling**: PostgreSQL connection pool
4. **Lazy Loading**: Frontend components lazy loaded
5. **Code Splitting**: Vite automatic code splitting
6. **Static Assets**: CDN-ready static asset structure

## Scalability

The architecture supports horizontal scaling:
- Frontend: Multiple instances behind load balancer
- Backend: Stateless design allows multiple instances
- Database: PostgreSQL replication for read scaling
- Cache: Redis Cluster for distributed caching

## Future Enhancements

1. **Real-time Features**: WebSocket for live chat and notifications
2. **File Upload**: S3 integration for video/document uploads
3. **Email Service**: SendGrid/SES for notifications
4. **Search**: Elasticsearch for advanced course search
5. **Analytics**: Integration with analytics services
6. **Mobile Apps**: React Native mobile applications
7. **Real AI Integration**: OpenAI API integration
8. **Video Streaming**: HLS/DASH for adaptive streaming
9. **Payment Integration**: Stripe for course payments
10. **Social Features**: Discussion forums and comments
