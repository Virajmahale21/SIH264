# Contributing to AICTE PS 264 Portal

Thank you for your interest in contributing to the AICTE Integrated Complaint & Overlap Tracking Platform!

---

## 1. Development Workflow

1. Fork the repository and clone your fork locally.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database and seed reference data:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```
4. Start development servers:
   ```bash
   # Terminal 1: Backend Express Server
   npm run server

   # Terminal 2: Frontend Vite Client
   npm run dev
   ```

---

## 2. Commit Message Conventions

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat(scope)`: A new feature for users
- `fix(scope)`: A bug fix
- `docs(scope)`: Documentation only changes
- `test(scope)`: Adding missing tests or correcting existing tests
- `refactor(scope)`: A code change that neither fixes a bug nor adds a feature
- `ci(scope)`: Changes to CI configuration files and scripts
- `chore(scope)`: Other changes that don't modify src or test files

---

## 3. Pull Request Guidelines

- Ensure all automated tests pass before opening a PR (`npm test`).
- Keep pull requests focused on a single responsibility.
- Update relevant documentation and locale files if modifying user-facing text.
