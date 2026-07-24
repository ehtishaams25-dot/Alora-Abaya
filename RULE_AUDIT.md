# Alora Abaya - Architectural & Rule Audit Tracker

> **Status Tracking Document**  
> This file tracks every rule violation in the `Alora-Abaya` repository against [Instruction.md](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/Instruction.md) and [AGENTS.md](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/AGENTS.md). 
> Use this checklist to fix items incrementally alongside Medusa API integration.

---

## Summary of Rule Categories

| Category | Description | Violations Count | Status |
| :--- | :--- | :---: | :---: |
| **1. TypeScript Boundaries** | Usage of `any` types | 12 instances | ❌ Pending |
| **2. Barrel Exports (`index.ts`)** | Deep imports into feature internals | 4 files | ❌ Pending |
| **3. Layered Architecture** | Missing `services/`, `hooks/`, `types/` folders in features | 5 features | ❌ Pending |
| **4. Monolithic Components** | Unusually large page files with mixed rendering & logic | 4 pages | ❌ Pending |
| **5. i18n Translation Structure** | Single 43KB resource file instead of per-locale JSON files | 1 file | ❌ Pending |
| **6. RTL / Logical CSS** | Hardcoded physical direction classes (`ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`) | 9 files | ❌ Pending |
| **7. Branding & Documentation** | Root README & `package.json` retains template title | 2 files | ❌ Pending |

---

## Detailed Violation Checklist

### Category 1: `any` Type Violations (TypeScript Boundaries)
*Rule: Never use `any`. Everything must be explicitly and strongly typed.*

- [ ] `src/features/home/components/BestSellersSection.tsx`
  - [L19](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/home/components/BestSellersSection.tsx#L19): `t: any`
  - [L20](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/home/components/BestSellersSection.tsx#L20): `addToCart: any`
- [ ] `src/features/home/components/NewArrivalsSection.tsx`
  - [L19](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/home/components/NewArrivalsSection.tsx#L19): `t: any`
  - [L20](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/home/components/NewArrivalsSection.tsx#L20): `addToCart: any`
- [ ] `src/features/product/components/ProductRecommendationsSection.tsx`
  - [L23](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/product/components/ProductRecommendationsSection.tsx#L23): `t: any`
  - [L24](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/product/components/ProductRecommendationsSection.tsx#L24): `item: any`
- [ ] `src/features/product/components/ProductEditorialReviewsSection.tsx`
  - [L264](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/product/components/ProductEditorialReviewsSection.tsx#L264): `as any` cast
- [ ] `src/hooks/useLongPressQuickView.ts`
  - [L8](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/hooks/useLongPressQuickView.ts#L8): `product: any`
- [x] `src/pages/LoginPage.tsx` (Refactored to orchestrate `LoginForm` and `RegisterForm` from `@/features/auth`, removed physical direction classes)
- [x] `src/hooks/useAuth.ts` (Re-exported clean auth feature module)
- [x] `src/features/auth/` (Created 4-layer feature module: `services/`, `hooks/`, `components/`, `types/`, `index.ts`, `README.md`)
- [ ] `src/pages/WishlistPage.tsx`
  - [L24](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/pages/WishlistPage.tsx#L24): `t: any`
- [ ] `src/pages/AllDressesPage.tsx`
  - [L25](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/pages/AllDressesPage.tsx#L25): `t: any`
  - [L186](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/pages/AllDressesPage.tsx#L186): `t: any`

---

### Category 2: Deep Import Violations (`index.ts` Barrel Rule)
*Rule: Deep imports between features are prohibited. Only import from feature `index.ts` or `src/types`.*

- [ ] `src/providers/ShopProvider.tsx`
  - [L2](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/providers/ShopProvider.tsx#L2): Deep import `from '../features/home/types'`
- [ ] `src/pages/WishlistPage.tsx`
  - [L8](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/pages/WishlistPage.tsx#L8): Deep import `from '../features/home/types'`
- [ ] `src/hooks/useLongPressQuickView.ts`
  - [L2](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/hooks/useLongPressQuickView.ts#L2): Deep import `from '../features/home/types'`
- [ ] `src/data/dressesData.ts`
  - [L1](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/data/dressesData.ts#L1): Deep import `from '../features/home/types'`

---

### Category 3: Layered Architecture Violations (Feature Structure)
*Rule: Every feature directory MUST contain `components/`, `hooks/`, `services/`, `types/`, `index.ts`, and `README.md`.*

- [ ] `src/features/checkout/`: Missing `hooks/`, `services/`, `types/`
- [ ] `src/features/home/`: Missing `hooks/`, `services/`
- [ ] `src/features/profile/`: Missing `hooks/`, `services/`, `types/`
- [ ] `src/features/search/`: Missing `hooks/`, `services/`, `types/`
- [ ] `src/features/product/`: Missing `services/`
- [ ] `src/data/dressesData.ts`: 44KB static mock data file. Needs to be replaced with Medusa Store API services (`features/product/services/productService.ts`).
- [ ] `src/providers/ShopProvider.tsx`: 13KB monolithic context provider. Needs to be refactored into Medusa Cart/Customer React Query hooks.

---

### Category 4: Monolithic Page Components
*Rule: Pages should be lightweight wrappers orchestrating feature components. UI rendering and business logic must be separated.*

- [ ] `src/pages/AllDressesPage.tsx` (~1,000 lines / 47 KB monolithic file combining UI, filtering, modal state, and hardcoded items)
- [ ] `src/pages/WishlistPage.tsx` (27 KB monolithic file)
- [ ] `src/pages/LoginPage.tsx` (18 KB monolithic file)
- [ ] `src/pages/CartPage.tsx` (17 KB monolithic file)

---

### Category 5: i18n Translation Structure
*Rule: Group translation JSON files by feature/page in `src/i18n/locales/en/` and `src/i18n/locales/ar/`.*

- [ ] `src/i18n/resources.ts`: Single 43KB file with inline objects. Must be migrated to:
  - `src/i18n/locales/en/common.json`, `home.json`, `product.json`, `checkout.json`
  - `src/i18n/locales/ar/common.json`, `home.json`, `product.json`, `checkout.json`

---

### Category 6: Physical Direction CSS Classes (RTL Non-Compliance)
*Rule: Use logical CSS properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`, `inset-inline-end`). Avoid physical directional utilities.*

- [ ] `src/components/Navigation.tsx` ([L46](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/components/Navigation.tsx#L46), [L103](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/components/Navigation.tsx#L103), [L110](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/components/Navigation.tsx#L110), [L248](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/components/Navigation.tsx#L248))
- [ ] `src/pages/LoginPage.tsx` ([L119](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/pages/LoginPage.tsx#L119), [L143](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/pages/LoginPage.tsx#L143), [L166](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/pages/LoginPage.tsx#L166))
- [ ] `src/pages/AllDressesPage.tsx` ([L780](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/pages/AllDressesPage.tsx#L780))
- [ ] `src/features/home/components/InstagramGallerySection.tsx` ([L301](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/home/components/InstagramGallerySection.tsx#L301))
- [ ] `src/features/product/components/ProductSizeGuidePreview.tsx` ([L25](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/product/components/ProductSizeGuidePreview.tsx#L25))
- [ ] `src/features/product/components/ProductSizeGuideModal.tsx` ([L215](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/product/components/ProductSizeGuideModal.tsx#L215))
- [ ] `src/features/checkout/components/CheckoutWizardModal.tsx` ([L544](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/checkout/components/CheckoutWizardModal.tsx#L544), [L916](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/checkout/components/CheckoutWizardModal.tsx#L916))
- [ ] `src/features/search/components/SearchOverlayModal.tsx` ([L244](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/search/components/SearchOverlayModal.tsx#L244))
- [ ] `src/features/profile/components/AccountDashboardPage.tsx` ([L273](file:///home/ahmad/Desktop/Projects/alora/frontend/Alora-Abaya/src/features/profile/components/AccountDashboardPage.tsx#L273))

---

### Category 7: Branding & Documentation Updates
*Rule: Document project tech stack, architecture, and deployment commands in root README.*

- [ ] `README.md`: Update title from "React Tailwind TypeScript Template" to "Alora Abaya Storefront".
- [ ] `package.json`: Change `"name"` field from `"react-tailwind-typescript-template"` to `"alora-abaya-storefront"`.
