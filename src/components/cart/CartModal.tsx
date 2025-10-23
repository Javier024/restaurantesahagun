import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCartStore } from '../../store/useCartStore'
import { TotalOrder } from './TotalOrder'
import { ButtonCart } from './ButtonCart'
import { ProductsList } from './ProductsList'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function CartModal({ open, setOpen }: IProps) {
  const cart = useCartStore((state) => state.cart)
  const navigate = useNavigate()
  return (
    <section
      style={{ transform: `translateX(${open ? 0 : 100}%)` }}
      className='fixed bottom-0 top-20 right-0 flex flex-col justify-between overflow-hidden w-full max-w-md bg-white rounded-l-xl shadow-card transition-transform duration-300 ease-in-out'
    >
      <article className='grid place-items-center py-7 bg-yellow-400 text-4xl font-semibold mb-3'>
        <h1>Tu pedido</h1>
      </article>

      <ProductsList cart={cart} />
      <article className='grid place-items-center w-full py-4 gap-4 px-3 border-t border-gray-400'>
        <TotalOrder cart={cart} />
        <ButtonCart
          text='Hacer pedido'
          handleClick={() => {
            cart.length > 0 ? navigate('/checkout') : toast.info('No hay elementos en el pedido', { duration: 1500 })
            cart.length && setOpen(false)
          }}
        />
      </article>
    </section>
  )
}
