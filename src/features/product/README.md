# Product Detail Feature (`src/features/product`)

This feature encapsulates the luxury Product Detail Page experience, evolving the quick view foundation into a full-scale editorial experience comparable to premium luxury fashion houses (such as House of CB and Meshki) while strictly preserving Alora's luxury minimal aesthetic.

## Architecture & Responsibilities

- **Components (`components/`)**: Rendering UI only. Includes `ProductDetailPage`, `ProductGallery`, `ProductPurchasePanel`, and `ProductTrustIndicators`.
- **Hooks (`hooks/`)**: Business logic and local state (`useProductDetail`) handling color selection, size transitions, gallery crossfades, and bag/wishlist integration via `useShop`.
- **Utils (`utils/`)**: Pure functions for deriving complete 7-view editorial image sets (`getProductGallery`) matching Arabic and English localization requirements.
- **Types (`types/`)**: Strongly typed DTOs and view models (`ProductGalleryView`, `ProductDetailState`, `ProductDetailProps`).

## Public API (`index.ts`)

- `ProductDetailPage`
- `ProductGallery`
- `ProductPurchasePanel`
- `ProductTrustIndicators`
- `useProductDetail`
- `getProductGallery`
- `type ProductGalleryView`
- `type ProductDetailState`
