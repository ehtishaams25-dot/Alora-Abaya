import { type ProductDress } from '../../../data/dressesData'

export interface ProductGalleryView {
  id: string
  url: string
  labelKey: string
  labelEn: string
  labelAr: string
}

export interface ProductDetailState {
  selectedImageIdx: number
  selectedSize: string
  selectedColorIdx: number
  isAddedToast: boolean
  sizeError: boolean
  inWishlist: boolean
  currentImage: string
  colorHex: string
  colorName: string
  galleryViews: ProductGalleryView[]
}

export interface ProductDetailActions {
  setSelectedImageIdx: (idx: number) => void
  setSelectedSize: (size: string) => void
  setSelectedColorIdx: (idx: number) => void
  setSizeError: (error: boolean) => void
  handleAddToBag: () => void
  handleWishlistToggle: () => void
}

export interface ProductDetailProps {
  product: ProductDress
  onClose?: () => void
  isModal?: boolean
}
