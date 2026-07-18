# React Tailwind TypeScript Template

A reusable Vite template for feature-driven React applications with TypeScript, Tailwind CSS, TanStack Query, Axios, and strict architectural boundaries.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- Vite
- ESLint

## Architecture

This project follows the feature-driven monolith structure described in [Instruction.md](Instruction.md).

```text
src/
├── assets/
├── components/
├── config/
├── features/
├── hooks/
├── layouts/
├── pages/
├── providers/
├── services/
├── utils/
├── App.tsx
└── main.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` type-checks and creates a production build.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript project checks.

## Creating Features

Every new feature must live in `src/features/[feature-name]/` and include:

- `components/`
- `hooks/`
- `services/`
- `types/`
- `index.ts`
- `README.md`

Only export the feature's public API from `index.ts`.
