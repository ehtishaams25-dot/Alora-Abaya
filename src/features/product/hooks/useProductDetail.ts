import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'
import { useShop } from '../../../providers/ShopProvider'
import { getProductGallery } from '../utils/gallery'
import { type ProductDetailState, type ProductDetailActions } from '../types'

export function useProductDetail(product: ProductDress): [ProductDetailState, ProductDetailActions] {
  const { i18n } = useTranslation()
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop()

  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0)
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false)
  const [sizeError, setSizeError] = useState<boolean>(false)

  const isArabic = i18n.language.startsWith('ar')
  const galleryViews = useMemo(() => getProductGallery(product), [product])
  const currentImage = galleryViews[selectedImageIdx]?.url || product.image

  const colorName = isArabic
    ? (product.colorNamesAr?.[selectedColorIdx] || product.colorNames?.[selectedColorIdx] || 'مميز')
    : (product.colorNames?.[selectedColorIdx] || 'Signature')
  const colorHex = product.colors?.[selectedColorIdx] || '#3B2F2F'

  const inWishlist = isInWishlist(product.id)

  const handleSelectSize = (size: string) => {
    setSelectedSize(size)
    setSizeError(false)
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => {
        setSizeError(false)
      }, 2000)
      return
    }
    addToCart(product, `${colorName} (${colorHex})`, `Size ${selectedSize}`)
    setIsAddedToast(true)
    setTimeout(() => {
      setIsAddedToast(false)
    }, 2500)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const state: ProductDetailState = {
    selectedImageIdx,
    selectedSize,
    selectedColorIdx,
    isAddedToast,
    sizeError,
    inWishlist,
    currentImage,
    colorHex,
    colorName,
    galleryViews
  }

  const actions: ProductDetailActions = {
    setSelectedImageIdx,
    setSelectedSize: handleSelectSize,
    setSelectedColorIdx,
    setSizeError,
    handleAddToBag,
    handleWishlistToggle
  }

  return [state, actions]
}
