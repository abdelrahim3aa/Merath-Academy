
# ========================================
# 📁 CONTRIBUTING.md
# ========================================

# 🤝 Contributing to Merath Academy

First off, thank you for considering contributing to Merath Academy! ❤️

It's people like you that make Merath Academy such a great tool for Islamic education.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed**
- **Explain which behavior you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, etc.)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### 🔨 Your First Code Contribution

Unsure where to begin? You can start by looking through these issues:

- **good-first-issue** - issues which should only require a few lines of code
- **help-wanted** - issues which should be a bit more involved

### 📝 Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Issue that pull request!

## 🛠️ Development Setup

### Prerequisites

- Node.js (v14+)
- MongoDB or MongoDB Atlas account
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/your-username/merath-academy.git
cd merath-academy

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development
npm run dev
```

## 🔄 Pull Request Process

1. **Update Documentation**: Update the README.md with details of changes if needed
2. **Update Version**: Update version numbers in package.json following [SemVer](http://semver.org/)
3. **Testing**: Ensure all tests pass
4. **Code Style**: Follow our coding conventions
5. **Commit Messages**: Write clear commit messages
6. **PR Description**: Provide a clear description of what your PR does

### Commit Message Guidelines

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

Examples:
```
feat: Add course progress tracking
fix: Resolve login authentication bug
docs: Update installation instructions
style: Format code according to style guide
refactor: Restructure authentication module
test: Add tests for course enrollment
```

## 📏 Style Guidelines

### JavaScript Style Guide

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### React Component Guidelines

```javascript
// Good
const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
    </div>
  );
};

// Bad
const cc = (c) => <div><h3>{c.t}</h3></div>;
```

### CSS Guidelines

- Use BEM naming convention
- Mobile-first approach
- Use CSS variables for colors
- Keep specificity low
- Use meaningful class names

```css
/* Good */
.course-card {
  padding: 20px;
  background: var(--primary-color);
}

.course-card__title {
  font-size: 24px;
}

/* Bad */
.cc { padding: 20px; }
.cc h3 { font-size: 24px; }
```

## 🧪 Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage
- Test edge cases

## 📚 Documentation

- Update README.md if needed
- Add JSDoc comments for functions
- Update API documentation
- Add inline comments for complex logic

## 🌍 Translation

We welcome translations! To add a new language:

1. Create a new folder in `src/locales/`
2. Copy English translations
3. Translate to your language
4. Submit PR

## 💻 Development Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes**
   - Write code
   - Add tests
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/my-new-feature
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in the description
   - Submit!

## ❓ Questions?

Feel free to ask questions in:
- GitHub Issues
- Discord community
- Email: dev@merathacademy.com

## 🙏 Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.

---

**Happy Coding! 🚀**

