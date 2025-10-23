import { IProductCart } from '../../types/product'

interface IProps {
  cart: IProductCart[]
}

export function TotalOrder({ cart }: IProps) {
  return (
    <div className='flex w-full items-center justify-between'>
      <p className='text-lg font-bold'>Total</p>
      <p className='text-lg font-bold'>
        {cart
          .reduce((acc, item) => acc + item.precio! * item.quantity, 0)
          .toLocaleString('es-AR', {
            style: 'currency',
            currency: 'COP',
          })}
      </p>
    </div>
  )
}
