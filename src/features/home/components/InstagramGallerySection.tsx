import { useTranslation } from 'react-i18next'
import { type InstagramPostItem } from '../types'

export function InstagramGallerySection() {
  const { t } = useTranslation()

  const posts: InstagramPostItem[] = [
    { id: "ig-1", likes: "1,420", comments: "48", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { id: "ig-2", likes: "2,180", comments: "92", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80" },
    { id: "ig-3", likes: "985", comments: "31", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" },
    { id: "ig-4", likes: "3,450", comments: "142", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
    { id: "ig-5", likes: "1,760", comments: "64", image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=600&q=80" },
    { id: "ig-6", likes: "2,890", comments: "115", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80" }
  ]

  return (
    <section id="instagram" className="section-padding bg-cream border-t border-border2 overflow-hidden">
      <div className="container-layali">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-eyebrow text-walnut mb-2 tracking-[0.25em] block">
            {t('home.instagram.eyebrow')}
          </span>
          <h2 className="text-h2 font-serif text-espresso">
            {t('home.instagram.title')}
          </h2>
          <p className="text-body text-mocha mt-3 text-sm sm:text-base">
            {t('home.instagram.description')}
          </p>
          
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-sand border border-border2 text-xs uppercase tracking-[0.2em] font-medium text-espresso hover:border-walnut hover:text-walnut transition-all shadow-sm"
          >
            <svg className="w-4 h-4 text-walnut" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>{t('home.instagram.followBtn')}</span>
          </a>
        </div>

        {/* 6-Column Mobile-First Grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4`) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden block bg-sand shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img
                src={post.image}
                alt="Instagram Lifestyle Editorial"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover / Touch Overlay */}
              <div className="absolute inset-0 bg-espresso/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-cream text-xs">
                <div className="flex items-center gap-4 font-sans font-medium">
                  <div className="flex items-center gap-1">
                    <span>♥</span>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💬</span>
                    <span>{post.comments}</span>
                  </div>
                </div>
                <span className="mt-3 text-[10px] uppercase tracking-widest text-sand/80 border-t border-cream/20 pt-2">
                  Shop Look
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
