import {
  HeroSection,
  NewArrivalsSection,
  EditorialBreakSection,
  BestSellersSection,
  WhyChooseUsSection,
  CustomerReviewsSection,
  InstagramGallerySection,
  MarqueeSection
} from '../features/home'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { AppLayout } from '../layouts/AppLayout'

export function HomePage() {
  useDocumentTitle('Alora | Luxury Dresses & Gowns الورا للفساتين')

  return (
    <AppLayout>
      <HeroSection />
      <WhyChooseUsSection />
      <NewArrivalsSection />
      <EditorialBreakSection />
      <BestSellersSection />
      <InstagramGallerySection />
      <CustomerReviewsSection />
      <MarqueeSection />
    </AppLayout>
  )
}
