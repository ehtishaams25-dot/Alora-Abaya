import { useRef, useCallback } from 'react'
import { type ProductItem } from '../features/home/types'
import { type ProductDress } from '../data/dressesData'
import { useShop } from '../providers/ShopProvider'

interface UseLongPressQuickViewOptions {
  product: ProductItem | ProductDress
  onQuickView?: (product: any) => void
  onNavigate?: () => void
  delay?: number
}

export function useLongPressQuickView({
  product,
  onQuickView,
  onNavigate,
  delay = 450
}: UseLongPressQuickViewOptions) {
  const { openQuickView } = useShop()
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const isLongPressed = useRef(false)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null)
  const touchStartTime = useRef<number>(0)

  const triggerQuickView = useCallback(() => {
    if (onQuickView) {
      onQuickView(product)
    } else if (openQuickView) {
      openQuickView(product)
    }
  }, [onQuickView, openQuickView, product])

  const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    isLongPressed.current = false
    touchStartTime.current = Date.now()
    if ('touches' in e && e.touches.length > 0) {
      touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else if ('clientX' in e) {
      touchStartPos.current = { x: e.clientX, y: e.clientY }
    }
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
    longPressTimer.current = setTimeout(() => {
      isLongPressed.current = true
      triggerQuickView()
    }, delay)
  }, [triggerQuickView, delay])

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStartPos.current || !longPressTimer.current) return
    let currentX = 0
    let currentY = 0
    if ('touches' in e && e.touches.length > 0) {
      currentX = e.touches[0].clientX
      currentY = e.touches[0].clientY
    } else if ('clientX' in e) {
      currentX = e.clientX
      currentY = e.clientY
    }
    if (Math.abs(currentX - touchStartPos.current.x) > 10 || Math.abs(currentY - touchStartPos.current.y) > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
        longPressTimer.current = null
      }
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    touchStartPos.current = null
  }, [])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (isLongPressed.current || (touchStartTime.current > 0 && Date.now() - touchStartTime.current > 300)) {
      e.preventDefault()
    }
  }, [])

  const handleClick = useCallback((e?: React.MouseEvent) => {
    if (isLongPressed.current) {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      isLongPressed.current = false
      return
    }
    if (onNavigate) {
      onNavigate()
    }
  }, [onNavigate])

  return {
    longPressProps: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
      onMouseDown: handleTouchStart,
      onMouseMove: handleTouchMove,
      onMouseUp: handleTouchEnd,
      onMouseLeave: handleTouchEnd,
      onContextMenu: handleContextMenu,
      onClick: handleClick
    },
    handleClick
  }
}
