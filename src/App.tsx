import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { WishlistPage } from './pages/WishlistPage'
import { CartPage } from './pages/CartPage'
import { AllDressesPage } from './pages/AllDressesPage'
import { ProductPage } from './pages/ProductPage'
import { QueryProvider } from './providers/QueryProvider'
import { ShopProvider, useShop } from './providers/ShopProvider'
import { GuestCheckoutModal } from './components/GuestCheckoutModal'
import { QuickViewModal } from './components/QuickViewModal'
import { CartDrawerModal } from './components/CartDrawerModal'
import { ProductSizeGuideModal } from './features/product'
import { SearchOverlayModal } from './features/search'
import { AccountDashboardPage } from './features/profile'

function ScrollToHashElement() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        setTimeout(() => {
          const delayedElement = document.getElementById(hash.replace('#', ''))
          if (delayedElement) {
            delayedElement.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])

  return null
}

function GlobalQuickViewContainer() {
  const { quickViewProduct, closeQuickView } = useShop()
  return <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />
}

function GlobalSizeGuideContainer() {
  const { activeSizeGuideProduct, closeSizeGuide } = useShop()
  return <ProductSizeGuideModal product={activeSizeGuideProduct} onClose={closeSizeGuide} />
}

export function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <QueryProvider>
        <ShopProvider>
          <ScrollToHashElement />
          <CartDrawerModal />
          <GuestCheckoutModal />
          <GlobalQuickViewContainer />
          <GlobalSizeGuideContainer />
          <SearchOverlayModal />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dresses" element={<AllDressesPage />} />
            <Route path="/all-dresses" element={<AllDressesPage />} />
            <Route path="/shop" element={<AllDressesPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/dresses/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/bag" element={<CartPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountDashboardPage />} />
            <Route path="/profile" element={<AccountDashboardPage />} />
            <Route path="/dashboard" element={<AccountDashboardPage />} />
            <Route path="/orders" element={<AccountDashboardPage />} />
          </Routes>
        </ShopProvider>
      </QueryProvider>
    </ReactLenis>
  )
}

