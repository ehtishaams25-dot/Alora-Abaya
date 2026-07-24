import type { ReactNode } from 'react'
import { useShopStore } from '../store/useShopStore'

export type {
  CartItem,
  OrderItem,
  OrderRecord,
  UserProfile,
} from '../store/useShopStore'

/**
 * ShopProvider no longer relies on React createContext / useContext.
 * It renders children directly while state is globally managed by Zustand.
 */
export function ShopProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/**
 * Global useShop hook powered by Zustand.
 * Eliminates useContext & 'must be used within ShopProvider' errors completely.
 */
export function useShop() {
  return useShopStore()
}
