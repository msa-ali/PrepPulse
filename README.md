# PrepPulse

A repository for interview preparation focusing on Data Structures & Algorithms (DSA), JavaScript machine coding, and React practice. Built with TypeScript/JavaScript, Vite, Vitest for testing, Storybook for component visualization, and ESLint/Prettier for code quality.

## Purpose

This repo is designed to:

- Practice DSA (data structures, algorithms, coding patterns).
- Solve JavaScript machine coding problems (e.g., utilities, polyfills, async patterns).
- Build and visualize React components for UI-related interview questions.
- Test solutions with Vitest.

## Tools

- **Build**: Vite (for React)
- **Testing**: Vitest, Testing Library (React)
- **Visualization**: Storybook (for React components)
- **Linting**: ESLint
- **Formatting**: Prettier
- **Languages**: TypeScript, JavaScript
- **IDE**: VSCode (workspace settings in `preppulse.code-workspace`)

## Usage

- **DSA**: Add problems to `src/practice/data-structures-and-algorithms/`.
- **Machine Coding**: Add JS utilities to `src/practice/machine-coding/`.
- **React**: Build components in `src/practice/react-components/` and add `.stories.tsx` files for Storybook.

## Visualizing React Components

- Use Storybook to see components individually:
  - Add a `.stories.tsx` file for each component in `src/practice/react-components/`.
  - Run `npm run storybook` and visit `http://localhost:6006`.

## VSCode Configuration

- Open `PrepPulse.code-workspace` for tailored settings (Prettier on save, ESLint fixes, etc.).
- Install recommended extensions: Prettier, ESLint, Vitest, Storybook (optional).

## Contributing

This is a personal practice repo, but feel free to fork and adapt it for your own prep!

## License

MIT
