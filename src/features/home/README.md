# Home Feature (`src/features/home/`)

## Overview
The `home` feature encapsulates the complete **Mobile-First**, **Bilingual (English LTR & Arabic RTL)** homepage experience for **Layali | Alora Abaya**. Designed with high-end luxury aesthetics, generous white space, curated typography, and fluid micro-interactions.

---

## Exposed Public API (`index.ts`)
- `HeroSection`: Large hero banner featuring a Signature Collection Masterpiece image tab and an Atelier Runway Video showcase.
- `NewArrivalsSection`: Mobile touch-swipeable carousel (`snap-x`) displaying latest seasonal abaya drops with badges, pricing (`AED`), and swatches.
- `CategoriesSection`: Visual 4-tile grid (`Daily Modest`, `Occasion & Evening`, `Bisht & Kaftans`, `Luxury Sets`) with dark image overlays and hover/touch scaling.
- `BestSellersSection`: Top-rated client favorites (`5.0 ★★★★★`) with mobile-friendly category filter tabs (`All`, `Embroidered Silks`, `Daily Modest`, `Occasion Gowns`).
- `WhyChooseUsSection`: The 4 pillars of Layali luxury distinction (`Grade A+ Fabrics`, `Custom Atelier Tailoring`, `Express Shipping`, `Stylist Concierge`).
- `CustomerReviewsSection`: Social proof testimonials from verified VIP buyers across Dubai, London, Riyadh, and Doha with swipeable mobile cards.
- `InstagramGallerySection`: Curated 6-column lifestyle photography grid with `@LayaliAtelier` tag and interactive shop-the-look overlays.
- `types`: Strongly typed domain interfaces (`ProductItem`, `CategoryItem`, `PillarItem`, `ReviewItem`, `InstagramPostItem`).

---

## Architecture & Mobile-First Standards
1. **Mobile-First (`320px–430px` width priority)**:
   - Carousels (`overflow-x-auto snap-x snap-mandatory`) prevent vertical scroll fatigue on mobile devices while expanding gracefully to 2x2 / 4-column grids on desktop (`sm:grid-cols-2 lg:grid-cols-4`).
   - Touch targets are enforced to at least `44x44px` with responsive font sizing (`clamp()`).
2. **Bilingual Integration (LTR / RTL)**:
   - All display strings connect to `i18next` resources (`t('home.*')`).
   - Direction-aware utilities (`me-*`, `ms-*`, `start-*`, `end-*`) ensure that when `dir="rtl"` is activated, layouts mirror perfectly without component duplication.
