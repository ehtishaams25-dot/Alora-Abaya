# Profile / Account Feature Module

## Overview
Provides a luxury, Amazon-inspired tabbed account dashboard (`AccountDashboardPage`) tailored for VIP clients. Includes order history with live tracking, invoice generation, reordering, wishlist integration, saved addresses, payment methods, profile settings, change password, and restock notification management.

## Public API (`index.ts`)
- `AccountDashboardPage`: Main account management page component.

## Dependencies
- `react-i18next` for bilingual support (`EN`/`AR`).
- `../../../providers/ShopProvider` for `userProfile`, `logout`, `cartItems`, `wishlistItems`, and order history data.
