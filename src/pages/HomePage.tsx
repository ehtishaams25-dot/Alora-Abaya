import { HeroSection } from '../features/home'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { AppLayout } from '../layouts/AppLayout'

export function HomePage() {
  useDocumentTitle('Layali | Luxury Dresses & Gowns ليالي')

  return (
    <AppLayout>
      <HeroSection />
    </AppLayout>
  )
}
