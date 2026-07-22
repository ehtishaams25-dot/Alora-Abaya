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
  useDocumentTitle('Alora | Luxury Dresses & Gowns الورا للفساتين')

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
