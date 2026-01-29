# Contributing to Wordly MCP App

Thank you for your interest in contributing to Wordly MCP App! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and collaborative. We're all here to build something useful together.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

When filing a bug report, include:
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, MCP client)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:
- Clear use case and motivation
- Detailed description of proposed functionality
- Any alternative solutions you've considered

### Pull Requests

1. **Fork and Clone**
   ```bash
   git clone https://github.com/arifszn/wordly-mcp-app.git
   cd wordly-mcp-app
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Add tests if applicable
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run build
   npm run serve
   ```
   Test in Claude Desktop or your MCP client of choice.

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for UI changes

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or bun
- Git

### Local Development

```bash
# Install dependencies
npm install

# Start development mode (auto-rebuild)
npm run dev

# In another terminal, test the server
npm run serve
```

### Project Structure

```
wordly-mcp-app/
├── src/
│   ├── mcp-app.tsx          # Main React component
│   ├── mcp-app.module.css   # Component styles
│   ├── global.css           # Global styles
│   └── vite-env.d.ts        # Type definitions
├── server.ts                # MCP server implementation
├── mcp-app.html            # HTML entry point
├── vite.config.ts          # Build configuration
└── tsconfig.json           # TypeScript config
```

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Message Format

We use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add syntax highlighting to code blocks`

## Testing

Before submitting a PR:

1. **Build successfully**
   ```bash
   npm run build
   ```

2. **Test in Claude Desktop**
   - Update your `claude_desktop_config.json` to point to your local build
   - Test the UI rendering
   - Verify all interactions work

3. **Test edge cases**
   - Very long text
   - Multiple variations
   - Different intent types
   - Clipboard functionality

## Questions?

Feel free to:
- Open a discussion on GitHub
- Comment on existing issues
- Reach out to maintainers

Thank you for contributing! 🎉
