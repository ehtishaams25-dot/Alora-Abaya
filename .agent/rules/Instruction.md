---
trigger: always_on
---

# AI Agent Instructions: Project Architecture & Coding Standards

You are an expert frontend engineer acting as a coding assistant for this project. You must strictly follow the architectural patterns, folder structures, and coding rules defined below. Do not deviate from this layout unless explicitly instructed.

---

# 🌍 Core Architecture Principle

This application is **bilingual from day one** and must support both:

- English (LTR)
- Arabic (RTL)

Internationalization (i18n) and bidirectional layout support are **core architectural requirements**, not post-launch enhancements.

Every component, layout, animation, page, and feature must be built once and automatically adapt to both languages using a **single shared codebase**.

Never duplicate components, pages, or layouts for different languages.

Localization should only affect:

- Display text
- Document direction (LTR / RTL)
- Locale formatting (dates, numbers, currency)
- Direction-aware icons
- Direction-aware animations

---

## 🛠️ Core Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Data Fetching / State:** Layered Hooks & Services (TanStack Query / Axios)
- **Internationalization:** react-i18next + i18next
- **Styling:** Tailwind CSS + clsx + tailwind-merge
- **Language Detection:** i18next-browser-languagedetector

---

# 🏢 Folder Structure & Domain Encapsulation

The project uses a **Feature-Driven Monolith (SPA)** architecture.

Instead of grouping files by type (all hooks together), organize code by business domain inside `src/features`.

## Target Directory Tree

```text
src/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── components/
│
├── config/
│
├── features/
│   └── [feature-name]/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       ├── README.md
│       └── index.ts
│
├── hooks/
│
├── i18n/
│   ├── index.ts
│   ├── resources.ts
│   └── locales/
│       ├── en/
│       └── ar/
│
├── layouts/
├── pages/
├── providers/
├── services/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

---

# Architecture & Code Standards

---

## 1. The `index.ts` Barrel Rule (Public API)

Every feature folder inside `src/features/[feature-name]/` must expose a single `index.ts`.

Only export the public API of the feature.

### Correct

```ts
import { LoginPage } from "@/features/auth";
```

### Incorrect

```ts
import { LoginButton } from "@/features/auth/components/LoginButton";
```

Deep imports between features are prohibited.

---

## 2. Strict One-Way Layered Architecture

Every feature must strictly separate responsibilities.

| Layer | Responsibility |
|---------|---------------|
| Components | Rendering UI only. No data fetching. |
| Hooks | Business logic, local state, TanStack Query hooks |
| Services | HTTP requests, API mapping, DTO conversion |
| Types | Interfaces, enums, DTOs |

Business logic should never live inside components.

---

## 3. TypeScript Boundaries

Never use `any`.

Everything must be strongly typed.

Feature-specific types belong inside:

```
src/features/[feature]/types
```

Shared types belong inside:

```
src/types
```

All component props, API responses, hook return values, utility functions, and service responses must be explicitly typed.

---

## 4. Styling Standards

Use Tailwind CSS utility classes exclusively.

For conditional styling use:

- clsx
- tailwind-merge

Example

```tsx
import { clsx } from "clsx";

const className = clsx(
    "rounded-lg",
    active && "bg-black text-white"
);
```

Never concatenate class names manually.

---

## 5. Internationalization (i18n) & Bidirectional Layout (LTR / RTL)

This project is bilingual from day one. Every component, page, layout, and interaction must fully support both:

- English (LTR)
- Arabic (RTL)

The Arabic version is **not** a separate implementation. Both languages must share the exact same components, business logic, routing, and architecture.

### Translation Rules

Never hardcode visible strings.

❌ Incorrect

```tsx
<h2>New Arrivals</h2>
```

✅ Correct

```tsx
<h2>{t("home.newArrivals")}</h2>
```

Every user-facing string must come from the translation resources.

---

### Translation Folder Structure

```text
src/i18n/
├── index.ts
├── resources.ts
└── locales/
    ├── en/
    │   ├── common.json
    │   ├── home.json
    │   ├── product.json
    │   └── checkout.json
    └── ar/
        ├── common.json
        ├── home.json
        ├── product.json
        └── checkout.json
```

Translation files should be grouped by feature/page rather than one massive JSON file.

---

### RTL Layout Rules

Every layout must function correctly in both directions.

Avoid hardcoded directional utilities.

❌ Avoid

```tsx
ml-4
mr-6
left-0
right-0
text-left
```

Prefer logical CSS properties or direction-aware utilities.

Examples

- `text-start`
- `text-end`
- `justify-start`
- `justify-end`
- `ps-*`
- `pe-*`

When logical utilities are unavailable, encapsulate direction-aware behavior inside reusable helper utilities rather than duplicating components.

---

### Component Requirements

Every reusable component must:

- Work perfectly in LTR and RTL.
- Preserve identical spacing and alignment.
- Handle longer Arabic strings gracefully.
- Avoid fixed widths for translated text.
- Use flexible layouts.
- Avoid absolute positioning whenever possible.
- Respect document direction automatically.

Never create Arabic-specific components.

❌

```
ProductCard.tsx
ProductCardArabic.tsx
```

✅

```
ProductCard.tsx
```

One component should support every language.

---

### Icons

Directional icons should automatically mirror.

Examples

- Chevron
- Arrow
- Next
- Previous
- Carousel navigation

Do not create duplicated RTL icons.

---

### Typography

Typography must support both Latin and Arabic scripts.

Recommended English Fonts

- Inter
- Geist
- Neue Haas Grotesk

Recommended Arabic Fonts

- IBM Plex Sans Arabic
- Noto Sans Arabic
- Cairo

Font selection should switch automatically according to the active locale.

---

### Numbers & Currency

Always use locale-aware formatting.

```ts
new Intl.NumberFormat(locale);

new Intl.DateTimeFormat(locale);
```

Never manually format dates or currency.

---

### Images

Avoid embedding text inside images.

Marketing banners should support localized copy overlays instead of baked-in typography.

---

### Animations

Animations must also respect layout direction.

Examples

- Drawers should slide from the correct side.
- Page transitions should originate from the proper direction.
- Carousels should reverse correctly.
- Navigation indicators should mirror automatically.

Avoid hardcoded left/right transforms.

---

### QA Requirements

Every component must be visually tested in:

- English (LTR)
- Arabic (RTL)

Acceptance Criteria

- No broken alignment
- No overflow
- No clipped Arabic text
- Correct icon direction
- Correct spacing
- Identical visual hierarchy
- Identical interaction behavior

---

## 6. Documentation Rules

### Root README

Every project initialization must include a root README documenting:

- Tech Stack
- Architecture
- Folder Structure
- Development Workflow
- Build Commands
- Deployment

### Feature README

Every feature inside:

```
src/features/
```

must include its own README describing:

- Feature purpose
- Public API
- Internal architecture
- Dependencies
- Exposed components
- Hooks
- Services

---

# Expected Output Format

Whenever generating new code:

1. Always provide the exact file path above every code block.
2. Every new feature must include:
   - README.md
   - index.ts
3. Keep UI rendering separate from business logic.
4. Never place API calls inside components.
5. Never use `any`.
6. Use Tailwind utilities exclusively.
7. Use barrel exports.
8. Never deep import another feature.
9. Every new component must support:
   - English (LTR)
   - Arabic (RTL)
10. Never duplicate components to support localization.
11. Every user-facing string must be translated.
12. Every layout, animation, and interaction must remain visually identical across both languages while automatically adapting to the current document direction.