import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { QueryProvider } from './providers/QueryProvider'

export function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#home')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      setCurrentRoute(hash || '#home')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const isLoginPage =
    currentRoute.startsWith('#login') ||
    currentRoute.startsWith('#account') ||
    currentRoute.startsWith('#signin') ||
    currentRoute.startsWith('#register') ||
    currentRoute.startsWith('#forgot-password')

  return (
    <QueryProvider>
      {isLoginPage ? <LoginPage /> : <HomePage />}
    </QueryProvider>
  )
}
