#!/bin/bash

echo "🚀 E-Learning Platform Setup"
echo "============================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Create .env files if they don't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "✅ Backend .env created"
else
    echo "✅ Backend .env already exists"
fi

if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend .env file..."
    cp frontend/.env.example frontend/.env
    echo "✅ Frontend .env created"
else
    echo "✅ Frontend .env already exists"
fi

echo ""
echo "🐳 Starting Docker containers..."
docker-compose up -d

echo ""
echo "⏳ Waiting for database to be ready..."
# Wait for database with health checks
for i in {1..30}; do
    if docker-compose exec -T postgres pg_isready -U elearning_user -d elearning > /dev/null 2>&1; then
        echo "✅ Database is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Database failed to start within 30 seconds"
        exit 1
    fi
    echo "Waiting... ($i/30)"
    sleep 1
done

echo ""
echo "🗄️  Running database migrations..."
docker-compose exec -T backend npm run migrate

echo ""
echo "🌱 Seeding database with sample data..."
docker-compose exec -T backend npm run seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 You can now access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   API Health: http://localhost:3001/health"
echo ""
echo "👤 Sample credentials:"
echo "   Instructor - Email: teacher@example.com, Password: password123"
echo "   Student - Email: student@example.com, Password: password123"
echo ""
echo "📖 See README.md for more information"
