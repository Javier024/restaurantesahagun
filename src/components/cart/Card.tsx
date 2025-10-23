import { useCart } from '../../hooks/useCart'
import type { IProductCart } from '../../types/product'
import { numberFormatter } from '../../utils/numberFormatter'
import { Quantity } from './Quantity'

interface IProps {
  item: IProductCart
}

export function Card({ item }: IProps) {
  const { addToCart, decrementQuantity, removeItem } = useCart()
  return (
    <article className='flex items-center gap-2 rounded-md bg-white p-1 shadow-card'>
      <div className='grid w-28 aspect-[16/13] overflow-hidden rounded-md'>
        <img src={item.imagen} alt={item.nombre} className='size-full object-cover' />
      </div>
      <div className='grid w-full'>
        <h2 className='text-lg'>{item.nombre}</h2>
        <Quantity
          quantity={item.quantity}
          increment={() => {
            addToCart(item)
          }}
          decrement={() => {
            decrementQuantity(item)
          }}
        />
      </div>
      <div className='flex flex-col items-end text-nowrap'>
        <p>$ {numberFormatter(item.precio! * item.quantity)}</p>
        <button
          type='button'
          className='text-orange-700'
          onClick={() => {
            removeItem(item)
          }}
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}
