import { create } from 'zustand'
import { IProductCart } from '../types/product'

interface CartStore {
  count: number
  cart: IProductCart[]
  setCount: (count: number) => void
  setCart: (cart: IProductCart[]) => void
}

const currentCart = sessionStorage.getItem('cart')

export const useCartStore = create<CartStore>((set) => ({
  count: 0,
  cart: currentCart ? JSON.parse(currentCart) : [],

  // Actions
  setCount: (count) => set({ count }),
  setCart: (cart: IProductCart[]) => set({ cart }),
}))
