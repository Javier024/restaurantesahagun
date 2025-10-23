import { FaMinus, FaPlus } from 'react-icons/fa6'

interface IProps {
  quantity: number
  increment: () => void
  decrement: () => void
}

export function Quantity({ quantity, increment, decrement }: IProps) {
  // JSX
  return (
    <div className='flex items-center gap-4'>
      <button type='button' onClick={decrement}>
        <FaMinus />
      </button>
      <p className='w-12 flex justify-center bg-white px-1 py-[2px] rounded-sm font-bold items-center'>{quantity}</p>
      <button type='button' onClick={increment}>
        <FaPlus />
      </button>
    </div>
  )
}
