import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { WishlistPage } from './pages/WishlistPage'
import { CartPage } from './pages/CartPage'
import { AllDressesPage } from './pages/AllDressesPage'
import { ProductPage } from './pages/ProductPage'
import { QueryProvider } from './providers/QueryProvider'
import { ShopProvider } from './providers/ShopProvider'
import { GuestCheckoutModal } from './components/GuestCheckoutModal'

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

export function App() {
  return (
    <QueryProvider>
      <ShopProvider>
        <ScrollToHashElement />
        <GuestCheckoutModal />
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
        </Routes>
      </ShopProvider>
    </QueryProvider>
  )
}
