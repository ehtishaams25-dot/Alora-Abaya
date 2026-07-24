# Auth Feature Module

## Overview
Provides Medusa v2 Store API customer authentication (login, registration, session management, and logout) adhering to the 4-layer architecture. Supports bilingual LTR/RTL rendering.

## Public API (`index.ts`)
- `LoginForm`: Modular luxury client login form component.
- `RegisterForm`: Modular client registration form component.
- `useCustomer`: React Query hook for fetching current active customer.
- `useLogin`: React Query mutation hook for customer login.
- `useRegister`: React Query mutation hook for customer registration.
- `useLogout`: React Query mutation hook for customer logout.
- `authService`: Service handling Medusa JS SDK customer API calls.
- `Customer`, `LoginCredentials`, `RegisterDTO`: Strictly typed TypeScript interfaces.

## Internal Architecture
- `components/`: UI components (`LoginForm`, `RegisterForm`).
- `hooks/`: TanStack Query authentication hooks (`useAuth.ts`).
- `services/`: Medusa SDK authentication requests (`authService.ts`).
- `types/`: Strongly typed interfaces (`authTypes.ts`).
