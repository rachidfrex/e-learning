# Contributing to E-Learning Platform

Thank you for your interest in contributing to the E-Learning Platform! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the Issues section
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, browser)

### Suggesting Features

1. Check if the feature has already been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Development Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/e-learning.git
   cd e-learning
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set up the development environment**
   ```bash
   ./setup.sh
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

5. **Test your changes**
   ```bash
   # Backend tests
   cd backend
   npm test
   
   # Frontend build
   cd frontend
   npm run build
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Use conventional commit messages:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Wait for review

## Coding Standards

### Backend (TypeScript/Node.js)

- Use TypeScript for type safety
- Follow ESLint rules
- Use async/await for asynchronous operations
- Write meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Handle errors appropriately

Example:
```typescript
/**
 * Fetches a course by ID
 * @param id - Course ID
 * @returns Course object or null if not found
 */
async function getCourseById(id: number): Promise<Course | null> {
  try {
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
}
```

### Frontend (React/TypeScript)

- Use functional components with hooks
- Use TypeScript interfaces for props
- Keep components small and reusable
- Use meaningful component names
- Extract complex logic into custom hooks
- Use Tailwind CSS for styling

Example:
```typescript
interface CourseCardProps {
  course: Course;
  onEnroll: (id: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
      <button
        onClick={() => onEnroll(course.id)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enroll
      </button>
    </div>
  );
};
```

## Testing Guidelines

### Backend Tests

- Write unit tests for business logic
- Use Jest for testing
- Mock external dependencies
- Aim for >80% code coverage
- Test edge cases and error conditions

Example:
```typescript
describe('Quiz Score Calculation', () => {
  it('should calculate correct score for all correct answers', () => {
    const questions = [...];
    const answers = {...};
    const score = calculateScore(questions, answers);
    expect(score).toBe(100);
  });
});
```

### Frontend Tests

- Test user interactions
- Test component rendering
- Test API calls with mocked responses
- Use React Testing Library

## Documentation

- Update README.md if adding new features
- Update API documentation for new endpoints
- Add JSDoc comments for functions
- Update ARCHITECTURE.md for architectural changes
- Include code examples where helpful

## Pull Request Guidelines

### PR Title
Use conventional commit format:
- `feat: add course search functionality`
- `fix: resolve quiz submission bug`
- `docs: update API documentation`

### PR Description
Include:
- Summary of changes
- Related issue number (#123)
- Testing performed
- Screenshots for UI changes
- Breaking changes (if any)

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No new warnings
- [ ] Works locally with Docker

## Review Process

1. Automated checks run (build, tests, linting)
2. Code review by maintainers
3. Address feedback and push changes
4. Final approval
5. Merge to main branch

## Release Process

1. Version bump in package.json
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to production

## Getting Help

- Check existing documentation
- Search closed issues
- Ask in discussions
- Contact maintainers

## Project Structure

```
e-learning/
├── backend/           # Express.js API
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── models/   # Database models
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Express middleware
│   │   ├── migrations/ # DB migrations
│   │   └── tests/    # Unit tests
│   └── package.json
├── frontend/         # React application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/    # Page components
│   │   ├── services/ # API services
│   │   └── utils/    # Utility functions
│   └── package.json
└── docker-compose.yml # Docker configuration
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

Thank you for contributing! 🎉
