import { Link, useLocation } from 'react-router-dom'
import { RoutesPath } from '../../routes/routes'
import { TbShoppingBagPlus } from 'react-icons/tb'
import { useCart } from '../../hooks/useCart'
import type { IProduct } from '../../types/product'
import { numberFormatter } from '../../utils/numberFormatter'

interface IProps extends Partial<IProduct> {
  isFinal?: boolean
  id?: string
}

export function ProductCard({ imagen, nombre, precio, isFinal, id, descripcion }: IProps) {
  const url = id ? encodeURIComponent(id) : ''
  const { pathname } = useLocation()
  const { addToCart } = useCart()

  return (
    <div className="relative w-[90%] sm:w-72 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white">
      {/* Imagen */}
      <div className="relative w-full aspect-[9/6] overflow-hidden">
        <img
          src={imagen}
          alt={nombre}
          className="size-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Botón agregar al carrito */}
        {pathname === RoutesPath.menu && (
          <button
            type="button"
            className="absolute bottom-2 right-2 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300"
            title="Agregar al pedido"
            onClick={(e) => {
              e.preventDefault()
              addToCart({ nombre, descripcion, precio, quantity: 1, imagen })
            }}
          >
            <TbShoppingBagPlus className="text-xl" />
          </button>
        )}
      </div>

      {/* Contenido */}
      <div className="grid p-3 gap-1">
        <p className="text-lg font-semibold text-gray-800 truncate">{nombre}</p>
        <p className="text-orange-600 font-bold text-base">$ {numberFormatter(precio ?? 0)}</p>
      </div>

      {/* Overlay para “Ver más” */}
      {isFinal ? (
        <div className="absolute inset-0 grid place-items-center bg-black/30 text-white backdrop-blur-sm">
          <Link
            to={RoutesPath.menu}
            className="text-xl font-bold hover:underline transition-all"
          >
            Ver más productos
          </Link>
        </div>
      ) : (
        <Link
          to={RoutesPath.menuDetail(url)}
          className="absolute inset-0"
          aria-label={`Ver detalles de ${nombre}`}
        />
      )}
    </div>
  )
}
