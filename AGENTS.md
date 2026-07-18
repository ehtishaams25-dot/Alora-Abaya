# Agent Instructions

Follow the complete project architecture and coding rules in [Instruction.md](Instruction.md).

Key rules for this template:

- Use React, TypeScript, and Tailwind CSS.
- Keep the feature-driven monolith structure under `src/features/`.
- Import from another feature only through its `index.ts` public API.
- Keep rendering in components, business logic and data fetching in hooks, and HTTP/data mapping in services.
- Never use `any`.
- Place shared reusable UI in `src/components/`, feature-scoped UI in `src/features/[feature]/components/`, and shared types in `src/types/` only when used by multiple features.
- Add a root `README.md` and a feature `README.md` for every new feature.
