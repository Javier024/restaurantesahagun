interface IProps {
  text: string
  handleClick: () => void
}

export function ButtonCart({ text, handleClick }: IProps) {
  return (
    <button
      onClick={handleClick}
      className="
        flex items-center justify-center gap-2 
        w-full py-3 px-5 
        bg-gradient-to-r from-orange-500 to-orange-600 
        hover:from-orange-600 hover:to-orange-700 
        text-white font-semibold 
        rounded-xl shadow-md 
        hover:shadow-lg 
        transform hover:scale-[1.02] 
        transition-all duration-200
      "
    >
      <span role="img" aria-label="pedido">
        🍽️
      </span>
      {text}
    </button>
  )
}
