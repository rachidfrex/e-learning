# Quick Start Guide

Get your e-learning platform up and running in 5 minutes!

## Prerequisites

- Docker and Docker Compose installed
- Git installed

## Installation Steps

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/e-learning.git
cd e-learning

# Run automated setup
./setup.sh
```

That's it! The setup script will:
- ✅ Create environment files
- ✅ Start all Docker containers
- ✅ Run database migrations
- ✅ Seed sample data

### 2. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

### 3. Login

Use these sample credentials:

**Instructor Account:**
- Email: `teacher@example.com`
- Password: `password123`

**Student Account:**
- Email: `student@example.com`
- Password: `password123`

## What's Included?

The seed data provides:
- ✅ 2 sample users (instructor and student)
- ✅ 3 courses (JavaScript, React, Node.js)
- ✅ Multiple lessons with content and transcripts
- ✅ A quiz with 5 questions
- ✅ Sample progress data

## Common Commands

### Docker Management

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart a service
docker-compose restart backend
```

### Database Operations

```bash
# Run migrations
docker-compose exec backend npm run migrate

# Seed database
docker-compose exec backend npm run seed

# Access PostgreSQL
docker-compose exec postgres psql -U elearning_user -d elearning
```

### Development

```bash
# Backend development
cd backend
npm install
npm run dev

# Frontend development
cd frontend
npm install
npm run dev

# Run tests
cd backend
npm test
```

## Troubleshooting

### Services Won't Start

```bash
# Check if ports are in use
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis

# Stop any conflicting services or change ports in docker-compose.yml
```

### Database Connection Issues

```bash
# Check if database is running
docker-compose ps

# Restart database
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Reset Everything

```bash
# Stop and remove all containers, volumes
docker-compose down -v

# Start fresh
./setup.sh
```

## Next Steps

### As a Student

1. **Browse Courses**: Go to http://localhost:3000/courses
2. **Enroll**: Click on a course and enroll
3. **Watch Lessons**: Start learning from the course detail page
4. **Take Quizzes**: Test your knowledge
5. **Track Progress**: Check your dashboard
6. **Ask AI**: Get help from the AI teacher

### As an Instructor

1. **Create Course**: Use API or create UI for course creation
2. **Add Lessons**: Add lesson content and videos
3. **Create Quizzes**: Add quizzes to test students
4. **Monitor Progress**: View student progress

### Using the API

```bash
# Register new user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"password123","name":"New User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'

# Get all courses (use token from login)
curl http://localhost:3001/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Development Workflow

### Making Changes

1. **Edit code** in `backend/src` or `frontend/src`
2. **Hot reload** happens automatically
3. **Test changes** in browser
4. **Run tests** to verify
5. **Commit changes** with descriptive messages

### Adding a New Feature

1. Create a new branch
2. Implement feature (model → controller → route → frontend)
3. Write tests
4. Update documentation
5. Create pull request

## Configuration

### Environment Variables

Backend (`backend/.env`):
```env
PORT=3001
DB_HOST=postgres
DB_NAME=elearning
JWT_SECRET=your-secret-key
```

Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:3001
```

### Changing Ports

Edit `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "3000:3000"  # Change first number

backend:
  ports:
    - "3001:3001"  # Change first number
```

## Resources

- [Full Documentation](README.md)
- [Architecture](ARCHITECTURE.md)
- [Contributing](CONTRIBUTING.md)
- [API Reference](README.md#-api-documentation)

## Support

- 📧 Email: support@elearning.com
- 💬 Issues: https://github.com/yourusername/e-learning/issues
- 📖 Docs: https://github.com/yourusername/e-learning

## Tips

1. **Use Dev Tools**: Browser dev tools and React DevTools
2. **Check Logs**: Always check Docker logs for errors
3. **Test Early**: Test changes immediately after making them
4. **Read Docs**: Check README and ARCHITECTURE for details
5. **Ask Questions**: Open an issue if you're stuck

---

Happy Learning! 🎓
