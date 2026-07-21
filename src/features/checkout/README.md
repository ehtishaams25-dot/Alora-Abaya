# Checkout Feature Module

## Overview
Provides a luxury multi-step guided checkout sequence (`CheckoutWizardModal`) supporting guest vs. VIP authentication, shipping address specification, branded payment methods selection (including Tabby and Tamara split payments), order review, and cinematic order confirmation with an atelier status timeline.

## Public API (`index.ts`)
- `CheckoutWizardModal`: Guided multi-step checkout wizard component.

## Dependencies
- `react-i18next` for bilingual LTR/RTL support.
- `../../../providers/ShopProvider` for cart contents, total calculation, order creation, and modal state.
