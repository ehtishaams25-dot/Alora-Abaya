import { type ProductDress } from '../../../data/dressesData'
import { type ProductGalleryView } from '../types'

export function getProductGallery(product: ProductDress): ProductGalleryView[] {
  if (product.gallery && product.gallery.length > 0) {
    return product.gallery.map((item, index) => ({
      id: item.id || `custom-view-${index}`,
      url: item.url,
      labelKey: item.labelKey || 'product.views.frontView',
      labelEn: 'View',
      labelAr: 'عرض'
    }))
  }

  // Curated fallback set of 7 high-resolution luxury editorial views
  return [
    {
      id: 'view-front',
      url: product.image,
      labelKey: 'product.views.frontView',
      labelEn: 'Front View',
      labelAr: 'عرض أمامي'
    },
    {
      id: 'view-side',
      url: product.secondImage || product.image,
      labelKey: 'product.views.sideView',
      labelEn: 'Side View',
      labelAr: 'عرض جانبي'
    },
    {
      id: 'view-back',
      url: product.secondImage || 'https://images.unsplash.com/photo-1772474557170-4818d01d7bca?auto=format&fit=crop&w=1200&q=88',
      labelKey: 'product.views.backView',
      labelEn: 'Back View',
      labelAr: 'عرض خلفي'
    },
    {
      id: 'view-embroidery',
      url: 'https://images.unsplash.com/photo-1762376128087-bc29c6df08c0?auto=format&fit=crop&w=1200&q=88',
      labelKey: 'product.views.embroidery',
      labelEn: 'Close-up Embroidery',
      labelAr: 'تطريز مقرب'
    },
    {
      id: 'view-fabric',
      url: 'https://images.unsplash.com/photo-1767469697194-ac997d70b1ee?auto=format&fit=crop&w=1200&q=88',
      labelKey: 'product.views.fabric',
      labelEn: 'Fabric Detail',
      labelAr: 'تفاصيل القماش'
    },
    {
      id: 'view-lifestyle',
      url: 'https://images.unsplash.com/photo-1752794673269-dc356838c5fd?auto=format&fit=crop&w=1200&q=88',
      labelKey: 'product.views.lifestyle',
      labelEn: 'Lifestyle Image',
      labelAr: 'إطلالة حية'
    },
    {
      id: 'view-walking',
      url: 'https://images.unsplash.com/photo-1762605135326-5c4bcc5ef006?auto=format&fit=crop&w=1200&q=88',
      labelKey: 'product.views.walking',
      labelEn: 'Walking Shot',
      labelAr: 'لقطة انسيابية أثناء المشي'
    }
  ]
}
