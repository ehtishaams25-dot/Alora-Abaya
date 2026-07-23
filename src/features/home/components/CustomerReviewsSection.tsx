import { useTranslation } from 'react-i18next'
import { type ReviewItem } from '../types'

export function CustomerReviewsSection() {
  const { t } = useTranslation()

  const reviews: ReviewItem[] = [
    {
      id: "rev-1",
      author: t('home.reviews.items.0.author'),
      location: t('home.reviews.items.0.location'),
      quote: t('home.reviews.items.0.quote'),
      rating: t('home.reviews.items.0.rating')
    },
    {
      id: "rev-2",
      author: t('home.reviews.items.1.author'),
      location: t('home.reviews.items.1.location'),
      quote: t('home.reviews.items.1.quote'),
      rating: t('home.reviews.items.1.rating')
    },
    {
      id: "rev-3",
      author: t('home.reviews.items.2.author'),
      location: t('home.reviews.items.2.location'),
      quote: t('home.reviews.items.2.quote'),
      rating: t('home.reviews.items.2.rating')
    },
    {
      id: "rev-4",
      author: t('home.reviews.items.3.author'),
      location: t('home.reviews.items.3.location'),
      quote: t('home.reviews.items.3.quote'),
      rating: t('home.reviews.items.3.rating')
    }
  ]

  return (
    <section className="section-padding bg-sand">
      <div className="container-alora">
        {/* Minimalist Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-eyebrow text-walnut mb-2 tracking-[0.28em] block">
            {t('home.reviews.eyebrow')}
          </span>
          <h2 className="text-h2 font-serif text-espresso font-normal tracking-tight">
            {t('home.reviews.title')}
          </h2>
        </div>

        {/* Touch Swipeable Cards on Mobile -> Desktop Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory pb-6 sm:pb-0 sm:overflow-visible scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0 scroll-px-5 sm:scroll-px-0 after:content-[''] after:w-px after:shrink-0 sm:after:hidden">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-cream border border-border2/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between flex-shrink-0 w-[290px] sm:w-auto snap-start shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex text-taupe text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <span className="bg-sand px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-success border border-border2 font-medium">
                    {t('common.verifiedBuyer')}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="font-serif text-sm sm:text-base text-espresso leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-border2/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-espresso">
                    {item.author}
                  </h4>
                  <p className="text-[11px] font-sans text-mocha uppercase tracking-wider mt-0.5">
                    {item.location}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-sand border border-border2 flex items-center justify-center text-walnut font-serif text-xs font-medium">
                  {item.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
