import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { ProductDetailPage } from '../features/product'
import { DRESSES_DATA } from '../data/dressesData'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  const product = DRESSES_DATA.find((p) => p.id === id) || DRESSES_DATA[0]
  const title = isArabic ? (product?.nameAr || product?.name) : product?.name

  useDocumentTitle(title ? `${isArabic ? 'الورا للفساتين' : 'Alora'} | ${title}` : (isArabic ? 'الورا للفساتين | تفاصيل القطعة' : 'Alora | Product Details'))

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-sand font-sans">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto">
          <h1 className="font-serif text-3xl text-espresso mb-4">
            {t('product.notFoundTitle', isArabic ? 'القطعة غير متوفرة' : 'Piece Not Found')}
          </h1>
          <p className="text-mocha text-sm leading-relaxed mb-8">
            {t('product.notFoundDesc', isArabic
              ? 'لم نتمكن من العثور على القطعة المطلوبة. يرجى استكشاف مجموعتنا الملكية الكاملة.'
              : 'We could not find the specific masterpiece you are looking for. Please explore our curated seasonal collection.')}
          </p>
          <Link to="/dresses" className="btn-primary">
            {t('product.browseAll', isArabic ? 'تصفح كافة الفساتين' : 'Browse All Dresses')}
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-sand font-sans">
      <Navigation />
      <main className="flex-1 flex flex-col">
        <ProductDetailPage product={product} />
      </main>
      <Footer />
    </div>
  )
}
