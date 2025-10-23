import { useState } from 'react'
import { useCartStore } from '../../store/useCartStore'
import { ProductsList } from '../cart/ProductsList'
import { CheckOutForm } from './CheckOutForm'
import { Summary } from './Summary'

interface Order {
  typeOrder: string
  tableNumber?: string
  fullName?: string
  phone?: string
  address?: string
  neighborhood?: string
  paymentMethod?: string
}

export function CheckOutView() {
  const { cart } = useCartStore()
  const [orderData, setOrderData] = useState<Order>()
  return (
    <section className='section-page'>
      {!orderData && <CheckOutForm setOrder={setOrderData} />}
      <div className='flex flex-col-reverse items-center md:items-start md:flex-row w-full py-4 px-3 md:px-10 gap-5'>
        <ProductsList cart={cart} isCheckout />
        <Summary orderData={orderData} />
      </div>
    </section>
  )
}
