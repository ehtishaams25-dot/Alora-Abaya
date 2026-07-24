import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type ProductItem } from '../features/home/types'
import { DRESSES_DATA, type ProductDress } from '../data/dressesData'

export interface CartItem extends ProductItem {
  quantity: number
  selectedColor?: string
  selectedSize?: string
  numericPrice: number
}

export interface OrderItem {
  productId: string
  name: string
  nameAr: string
  price: string
  size: string
  color: string
  image: string
  quantity?: number
}

export interface OrderRecord {
  id: string
  date: string
  status: 'Tailoring in Atelier' | 'In Transit' | 'Delivered'
  statusAr: string
  total: string
  numericTotal: number
  trackingNumber: string
  items: OrderItem[]
}

export interface UserProfile {
  name: string
  nameAr: string
  email: string
  phone: string
  tier: string
  orders: OrderRecord[]
}

const INITIAL_WISHLIST: ProductItem[] = [
  {
    id: 'bs-2',
    name: 'Al-Dana Pleated Crepe Abaya',
    nameAr: 'عباية الدانة كريب بكسرات أنيقة',
    price: '1,950',
    image: 'https://images.unsplash.com/photo-1772474557170-4818d01d7bca?auto=format&fit=crop&w=800&q=85',
    rating: '4.9',
    reviewsCount: '62',
    category: 'Daily Modest',
    colors: ['#3B2F2F', '#B38B6D', '#1A1A1A'],
  },
  {
    id: 'bs-4',
    name: 'Lulwa Ivory Raw Silk Coat',
    nameAr: 'معطف لولوة من الحرير الخام العاجي',
    price: '2,850',
    image: 'https://images.unsplash.com/photo-1762376128087-bc29c6df08c0?auto=format&fit=crop&w=800&q=85',
    rating: '4.9',
    reviewsCount: '54',
    category: 'Embroidered Silks',
    colors: ['#FAF9F6', '#B38B6D'],
  },
  {
    id: 'na-1',
    name: 'Royal Silk Bisht Abaya',
    nameAr: 'عباية بشت ملكية من الحرير',
    price: '2,450',
    image: 'https://images.unsplash.com/photo-1772474500365-c2c520545f44?auto=format&fit=crop&w=800&q=85',
    rating: '5.0',
    reviewsCount: '38',
    category: 'Occasion Gowns',
    colors: ['#1A1A1A', '#3B2F2F', '#8B7355'],
  },
]

const INITIAL_CART: CartItem[] = [
  {
    id: 'bs-1',
    name: 'Noor Pearl-Trimmed Chiffon',
    nameAr: 'عباية نور شيفون مزينة باللؤلؤ',
    price: '2,650',
    numericPrice: 2650,
    image: 'https://images.unsplash.com/photo-1772474511860-9cef46d98ea6?auto=format&fit=crop&w=800&q=85',
    category: 'Embroidered Silks',
    selectedColor: 'Midnight Nidha',
    selectedSize: 'Size 56',
    quantity: 1,
  },
  {
    id: 'bs-3',
    name: 'Sultana Gold-Embroidered Bisht',
    nameAr: 'بشت سلطانة مطرز بالذهب الملكي',
    price: '3,400',
    numericPrice: 3400,
    image: 'https://images.unsplash.com/photo-1772474587292-08b3e8932acd?auto=format&fit=crop&w=800&q=85',
    category: 'Occasion Gowns',
    selectedColor: 'Royal Gold Zari',
    selectedSize: 'Size 58',
    quantity: 1,
  },
]

const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0
}

interface ShopState {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  toggleLogin: () => void
  logout: () => void

  wishlistItems: ProductItem[]
  addToWishlist: (item: ProductItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void

  cartItems: CartItem[]
  addToCart: (item: ProductItem, color?: string, size?: string) => void
  removeFromCart: (id: string, color?: string, size?: string) => void
  updateQuantity: (id: string, delta: number, color?: string, size?: string) => void
  clearCart: () => void

  subtotal: number
  shipping: number
  taxes: number
  total: number

  isCheckoutModalOpen: boolean
  openCheckoutModal: () => void
  closeCheckoutModal: () => void

  quickViewProduct: ProductDress | null
  openQuickView: (item: ProductItem) => void
  closeQuickView: () => void

  isCartDrawerOpen: boolean
  openCartDrawer: () => void
  closeCartDrawer: () => void

  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void

  activeSizeGuideProduct: ProductDress | null
  openSizeGuide: (product: ProductDress) => void
  closeSizeGuide: () => void

  userProfile: UserProfile
  addOrder: (order: OrderRecord) => void
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
      toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
      logout: () => set({ isLoggedIn: false }),

      wishlistItems: INITIAL_WISHLIST,
      addToWishlist: (item: ProductItem) =>
        set((state) => {
          if (state.wishlistItems.some((p) => p.id === item.id)) return state
          return { wishlistItems: [item, ...state.wishlistItems] }
        }),
      removeFromWishlist: (id: string) =>
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((p) => p.id !== id),
        })),
      isInWishlist: (id: string) => get().wishlistItems.some((p) => p.id === id),
      clearWishlist: () => set({ wishlistItems: [] }),

      cartItems: INITIAL_CART,
      addToCart: (item: ProductItem, color = 'Midnight Black', size = 'Size 56') => {
        set((state) => {
          const existingIndex = state.cartItems.findIndex(
            (ci) => ci.id === item.id && ci.selectedColor === color && ci.selectedSize === size
          )
          let updated: CartItem[]
          if (existingIndex > -1) {
            updated = [...state.cartItems]
            updated[existingIndex].quantity += 1
          } else {
            updated = [
              ...state.cartItems,
              {
                ...item,
                quantity: 1,
                selectedColor: color,
                selectedSize: size,
                numericPrice: parsePrice(item.price),
              },
            ]
          }

          const subtotal = updated.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0)
          const shipping = 0
          const taxes = subtotal > 0 ? Math.round(subtotal * 0.15) : 0
          const total = subtotal + shipping + taxes

          return {
            cartItems: updated,
            subtotal,
            shipping,
            taxes,
            total,
            isCartDrawerOpen: true,
          }
        })
      },

      removeFromCart: (id: string, color?: string, size?: string) => {
        set((state) => {
          const updated = state.cartItems.filter((ci) => {
            if (color !== undefined && size !== undefined) {
              return !(ci.id === id && ci.selectedColor === color && ci.selectedSize === size)
            }
            return ci.id !== id
          })

          const subtotal = updated.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0)
          const shipping = 0
          const taxes = subtotal > 0 ? Math.round(subtotal * 0.15) : 0
          const total = subtotal + shipping + taxes

          return { cartItems: updated, subtotal, shipping, taxes, total }
        })
      },

      updateQuantity: (id: string, delta: number, color?: string, size?: string) => {
        set((state) => {
          const updated = state.cartItems
            .map((ci) => {
              const matches =
                color !== undefined && size !== undefined
                  ? ci.id === id && ci.selectedColor === color && ci.selectedSize === size
                  : ci.id === id
              if (matches) {
                const newQty = ci.quantity + delta
                return newQty > 0 ? { ...ci, quantity: newQty } : null
              }
              return ci
            })
            .filter((ci): ci is CartItem => ci !== null)

          const subtotal = updated.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0)
          const shipping = 0
          const taxes = subtotal > 0 ? Math.round(subtotal * 0.15) : 0
          const total = subtotal + shipping + taxes

          return { cartItems: updated, subtotal, shipping, taxes, total }
        })
      },

      clearCart: () => set({ cartItems: [], subtotal: 0, shipping: 0, taxes: 0, total: 0 }),

      subtotal: INITIAL_CART.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0),
      shipping: 0,
      taxes: Math.round(INITIAL_CART.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0) * 0.15),
      total:
        INITIAL_CART.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0) +
        Math.round(INITIAL_CART.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0) * 0.15),

      isCheckoutModalOpen: false,
      openCheckoutModal: () =>
        set({
          isCartDrawerOpen: false,
          quickViewProduct: null,
          isSearchOpen: false,
          isCheckoutModalOpen: true,
        }),
      closeCheckoutModal: () => set({ isCheckoutModalOpen: false }),

      quickViewProduct: null,
      openQuickView: (item: ProductItem) => {
        const fullProduct = DRESSES_DATA.find((p) => p.id === item.id) || (item as ProductDress)
        set({
          isCartDrawerOpen: false,
          isSearchOpen: false,
          quickViewProduct: fullProduct,
        })
      },
      closeQuickView: () => set({ quickViewProduct: null }),

      isCartDrawerOpen: false,
      openCartDrawer: () =>
        set({
          quickViewProduct: null,
          isSearchOpen: false,
          isCartDrawerOpen: true,
        }),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),

      isSearchOpen: false,
      openSearch: () =>
        set({
          isCartDrawerOpen: false,
          quickViewProduct: null,
          isCheckoutModalOpen: false,
          isSearchOpen: true,
        }),
      closeSearch: () => set({ isSearchOpen: false }),

      activeSizeGuideProduct: null,
      openSizeGuide: (product: ProductDress) =>
        set({
          isSearchOpen: false,
          activeSizeGuideProduct: product,
        }),
      closeSizeGuide: () => set({ activeSizeGuideProduct: null }),

      userProfile: {
        name: 'Sarah Al-Mansoor',
        nameAr: 'سارة المنصور',
        email: 'sarah.almansoor@luxury.com',
        phone: '+966 50 829 4810',
        tier: 'Signature Circle Member',
        orders: [
          {
            id: '#ALR-84920',
            date: '20 July 2026',
            status: 'Tailoring in Atelier',
            statusAr: 'قيد الخياطة في الأتليه',
            total: '3,400 SAR',
            numericTotal: 3400,
            trackingNumber: 'DHL-VIP-9948201',
            items: [
              {
                productId: 'bs-3',
                name: 'Sultana Gold-Embroidered Bisht',
                nameAr: 'بشت سلطانة مطرز بالذهب الملكي',
                price: '3,400',
                size: 'Size 58',
                color: 'Royal Gold Zari',
                image: 'https://images.unsplash.com/photo-1772474587292-08b3e8932acd?auto=format&fit=crop&w=800&q=85',
                quantity: 1,
              },
            ],
          },
        ],
      },
      addOrder: (order: OrderRecord) =>
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            orders: [order, ...state.userProfile.orders],
          },
        })),
    }),
    {
      name: 'alora_shop_store',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        wishlistItems: state.wishlistItems,
        cartItems: state.cartItems,
        userProfile: state.userProfile,
      }),
    }
  )
)

/**
 * Re-export useShop hook using Zustand store.
 * Completely eliminates createContext and useContext errors!
 */
export function useShop() {
  return useShopStore()
}
