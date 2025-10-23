import { GiHotMeal } from 'react-icons/gi'
import { IProductCart } from '../../types/product'
import { Card } from './Card'
import clsx from 'clsx'

interface IProps {
  cart: IProductCart[]
  isCheckout?: boolean
}

export function ProductsList({ cart, isCheckout }: IProps) {
  return (
    <div
      className={clsx([
        'grid gap-3 px-3 pb-3 grow content-start overflow-y-auto scroll-bar',
        {
          'bg-gray-200 pt-3 rounded-lg': isCheckout,
        },
      ])}
    >
      {cart.length ? (
        cart.map((item, index) => <Card key={index.toString() + item.nombre} item={item} />)
      ) : (
        <div className='grid place-items-center mt-20 text-gray-300'>
          <GiHotMeal size={150} />
          <p className='text-center text-xl font-bold'>No hay elementos en el pedido</p>
        </div>
      )}
    </div>
  )
}
