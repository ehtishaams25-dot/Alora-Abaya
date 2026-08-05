import {
  HeroSection,
  NewArrivalsSection,
  CategoriesSection,
  EditorialBreakSection,
  BestSellersSection,
  AtelierSection,
  CustomerReviewsSection,
  InstagramGallerySection
} from '../features/home'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { AppLayout } from '../layouts/AppLayout'

export function HomePage() {
  useDocumentTitle('Alora | Luxury Dresses & Gowns الورا للفساتين')

  return (
    <AppLayout>
      <HeroSection />
      <NewArrivalsSection />
      <CategoriesSection />
      <EditorialBreakSection />
      <AtelierSection />
      <BestSellersSection />
      <CustomerReviewsSection />
      <InstagramGallerySection />
    </AppLayout>
  )
}
