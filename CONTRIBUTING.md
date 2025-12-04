# Contributing to Biografy Link

Thank you for considering contributing to Biografy Link! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/device information

### Suggesting Features

We welcome feature suggestions! Please:
- Check if the feature is already requested
- Open an issue with the `feature-request` label
- Describe the feature and its benefits
- Provide use cases

### Code Contributions

#### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/Biografy-link.git
   cd Biografy-link
   ```

3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Set up the development environment:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

5. Make your changes

6. Test your changes thoroughly

7. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

8. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

9. Open a Pull Request

#### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add drag-and-drop link reordering
fix: resolve avatar upload error
docs: update setup instructions
```

#### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

#### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update the README if you've changed functionality
4. Request review from maintainers
5. Address review feedback
6. Wait for approval and merge

### Development Workflow

#### Frontend Development

```bash
cd frontend
npm run dev
```

#### Type Checking

```bash
cd frontend
npm run type-check
```

#### Building

```bash
cd frontend
npm run build
```

### Project Structure

```
Biografy-link/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities
│   │   ├── types/        # TypeScript types
│   │   └── styles/       # Global styles
├── supabase/          # Database migrations
├── docs/              # Documentation
└── README.md
```

### Database Changes

If you're making database changes:

1. Create a new migration file in `/supabase/migrations/`
2. Name it with a sequential number: `004_your_change.sql`
3. Test the migration thoroughly
4. Update `/docs/database-schema.md`

### Testing

Currently, we don't have automated tests, but we plan to add:
- Unit tests (Vitest)
- Integration tests
- E2E tests (Playwright)

When writing tests:
- Test user-facing functionality
- Mock Supabase calls
- Test error states
- Test edge cases

### Documentation

Good documentation helps everyone! When contributing:

- Update README if you change setup/usage
- Update API.md for API changes
- Add comments to complex code
- Update type definitions

### Questions?

Feel free to:
- Open an issue with the `question` label
- Reach out to the maintainers
- Check existing issues and discussions

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing private information
- Unprofessional conduct

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in the README

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for making Biografy Link better! 🚀
