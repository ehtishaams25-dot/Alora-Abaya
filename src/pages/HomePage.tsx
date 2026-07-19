import {
  HeroSection,
  NewArrivalsSection,
  CategoriesSection,
  BestSellersSection,
  WhyChooseUsSection,
  CustomerReviewsSection,
  InstagramGallerySection
} from '../features/home'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { AppLayout } from '../layouts/AppLayout'

export function HomePage() {
  useDocumentTitle('Layali | Luxury Dresses & Gowns ليالي')

  return (
    <AppLayout>
      <HeroSection />
      <NewArrivalsSection />
      <CategoriesSection />
      <BestSellersSection />
      <WhyChooseUsSection />
      <CustomerReviewsSection />
      <InstagramGallerySection />
    </AppLayout>
  )
}
