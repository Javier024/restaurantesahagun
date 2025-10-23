import { useEffect } from 'react'
import { toast } from 'sonner'
import { useCartStore } from '../store/useCartStore'
import type { IProductCart } from '../types/product'

function getCartFromStorage(): IProductCart[] {
  const cart = sessionStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

function saveCartToStorage(cart: IProductCart[]) {
  if (cart.length === 0) sessionStorage.removeItem('cart')
  else sessionStorage.setItem('cart', JSON.stringify(cart))
}

export function useCart() {
  const { setCount, cart, setCart } = useCartStore()

  useEffect(() => {
    setCount(cart.length)
  }, [cart, setCount])

  const addToCart = (product: IProductCart) => {
    const currentCart = getCartFromStorage()
    let updatedCart: IProductCart[]
    const existing = currentCart.find((item) => item.nombre === product.nombre)

    if (existing) {
      updatedCart = currentCart.map((item) =>
        item.nombre === product.nombre
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      )
      toast.success(`Se aumentó la cantidad de ${product.nombre}`)
    } else {
      updatedCart = [...currentCart, product]
      toast.success(`${product.nombre} agregado al carrito`)
    }

    setCart(updatedCart)
    saveCartToStorage(updatedCart)
  }

  const decrementQuantity = (product: IProductCart) => {
    const currentCart = getCartFromStorage()
    const updatedCart = currentCart.map((item) =>
      item.nombre === product.nombre
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    )

    setCart(updatedCart)
    saveCartToStorage(updatedCart)
  }

  const removeItem = (product: IProductCart) => {
    const currentCart = getCartFromStorage()
    const updatedCart = currentCart.filter((item) => item.nombre !== product.nombre)

    setCart(updatedCart)
    saveCartToStorage(updatedCart)
    toast.error(`${product.nombre} eliminado del carrito`)
    setCount(updatedCart.length)
  }

  return {
    addToCart,
    decrementQuantity,
    removeItem,
  }
}
