# E-Learning Platform

A comprehensive, full-stack e-learning platform with modern features including user authentication, course management, interactive lessons, AI-powered teacher assistance, and role-based dashboards.

## Features

### Core Features
- **User Authentication System**: JWT-based authentication with three roles (Student, Instructor, Admin)
- **Course Management**: Complete CRUD operations for courses and lessons
- **Interactive Lesson Player**: 
  - Video content support
  - Interactive quizzes with instant feedback
  - Resource attachments
  - Progress tracking
- **AI Teacher Assistant**: Get contextual help and answers to questions about lessons
- **Student Dashboard**: Track learning progress, view enrolled courses, and quiz performance
- **Instructor Dashboard**: Create and manage courses, view enrollment statistics
- **Admin Dashboard**: 
  - User management with role assignment
  - Platform analytics
  - Course moderation
- **Responsive Design**: Modern, animated UI that works on all devices

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

### Frontend
- **React.js** with hooks
- **React Router** for navigation
- **Axios** for API requests
- **Framer Motion** for animations (ready to integrate)
- **Context API** for state management

## Project Structure

```
e-learning/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── progressController.js
│   │   ├── adminController.js
│   │   └── aiController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Progress.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── progress.js
│   │   ├── admin.js
│   │   └── ai.js
│   └── middleware/
│       └── auth.js            # JWT verification
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── course/        # Course list, details
│   │   │   ├── lesson/        # Lesson player
│   │   │   ├── dashboard/     # Student & Instructor dashboards
│   │   │   ├── admin/         # Admin dashboard
│   │   │   └── common/        # Navbar
│   │   ├── context/
│   │   │   └── AuthContext.js # Authentication context
│   │   ├── services/          # API service layer
│   │   ├── pages/
│   │   │   └── Home.js
│   │   └── App.js
│   └── public/
├── server.js                  # Express server entry point
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/elearning
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   OPENAI_API_KEY=your_openai_api_key_here  # Optional for AI features
   ```

3. **Start MongoDB**:
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

4. **Start the backend server**:
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/:id` - Update course (Instructor/Admin)
- `DELETE /api/courses/:id` - Delete course (Instructor/Admin)
- `POST /api/courses/:id/enroll` - Enroll in course (Student)
- `GET /api/courses/instructor/my-courses` - Get instructor's courses

### Progress
- `GET /api/progress` - Get all user progress
- `GET /api/progress/:courseId` - Get course progress
- `POST /api/progress/:courseId/lesson/:lessonId` - Mark lesson complete
- `POST /api/progress/:courseId/quiz/:lessonId` - Submit quiz attempt

### Admin (Admin only)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/analytics` - Get platform analytics

### AI Teacher
- `POST /api/ai/query` - Ask AI a question
- `POST /api/ai/lesson-help/:courseId/:lessonId` - Get lesson-specific help

## Usage Guide

### For Students
1. Register an account with "Student" role
2. Browse available courses
3. Enroll in courses
4. Watch lessons and complete quizzes
5. Ask the AI teacher for help
6. Track progress on dashboard

### For Instructors
1. Register with "Instructor" role
2. Access Instructor Dashboard
3. Create new courses with lessons
4. Add quizzes and resources
5. Publish courses
6. Monitor student enrollment

### For Admins
1. Login with admin credentials
2. Access Admin Dashboard
3. Manage users and roles
4. View platform analytics
5. Moderate content

## Default User Roles

When registering, users can select:
- **student** - Can enroll in and take courses
- **instructor** - Can create and manage courses
- **admin** - Full platform access (set manually via database)

## Security Features

- Passwords hashed with bcrypt
- JWT token-based authentication
- Protected routes with role-based access control
- Input validation
- CORS configured

## Future Enhancements

- Video upload functionality
- Real-time chat between students and instructors
- Advanced analytics with charts
- Certificate generation
- Social learning features
- Mobile app
- Integration with OpenAI for enhanced AI teacher

## Development

### Running in Development Mode

Backend:
```bash
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For issues and questions, please open an issue in the repository.
