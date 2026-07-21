# Search Feature Module

## Overview
Provides a luxury full-screen search experience (`SearchOverlayModal`) with instant bilingual filtering, search suggestions, recent searches (localStorage), trending terms, and category pills.

## Public API (`index.ts`)
- `SearchOverlayModal`: Main full-screen modal component.

## Dependencies
- `react-i18next` for bilingual LTR/RTL text.
- `../../../data/dressesData` for catalog data.
- `../../../providers/ShopProvider` for modal open/close state.
