/* eslint-disable react-hooks/exhaustive-deps */
import { MdDeliveryDining } from 'react-icons/md'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'
import { numberFormatter } from '../../utils/numberFormatter'

import { Quantity } from '../cart/Quantity'
import { ButtonCart } from '../cart/ButtonCart'
import ProductsSlider from '../home/ProductsSlider'

import LogoEfectivo from '../../assets/efectivo.avif'
import LogoBancolombia from '../../assets/logo-bancolombia.png'
import LogoNequi from '../../assets/nequi _logo.webp'
import type { IProduct } from '../../types/product'

export function DetailView() {
  const { id: productId } = useParams()
  const { productById, filterProducts } = useProducts({ productId })
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(1)
  const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!productById) return
    setIsLoading(true)
    const filteredProducts = filterProducts(productById.categoría)
    setProductsFiltered(filteredProducts)
    const timeout = setTimeout(() => setIsLoading(false), 250)
    return () => clearTimeout(timeout)
  }, [productById])

  if (!productById)
    return (
      <section className="section-page text-center py-20">
        <p className="text-gray-500 text-lg">Producto no encontrado.</p>
      </section>
    )

  return (
    <section className="section-page py-10">
      {/* 🔙 Botón Volver al menú */}
      <div className="w-full flex justify-start mb-5 px-3 md:px-10">
        <button
          onClick={() => navigate('/menu')}
          className="bg-orange-500 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:bg-orange-600 transition-all"
        >
          ← Volver al menú
        </button>
      </div>

      <div
        className={`grid w-full place-items-center p-3 gap-12 transition-all duration-500 ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* 🧾 Detalle del producto */}
        <div className="w-full max-w-screen-lg p-3 md:p-7 flex flex-col md:flex-row justify-center gap-10 rounded-2xl shadow-card bg-white">
          {/* 📸 Imagen */}
          <article className="w-full aspect-square overflow-hidden rounded-xl shadow-md">
            <img
              src={productById.imagen}
              alt={productById.nombre}
              className="size-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </article>

          {/* 💬 Información del producto */}
          <article className="grid w-full md:max-w-[45%] rounded-xl self-stretch p-5 bg-gray-100 content-between gap-5 text-sm">
            <div>
              <h1 className="text-4xl font-semibold text-gray-800">{productById.nombre}</h1>
              <p className="mt-3 text-gray-600 leading-relaxed">
                <strong>Descripción:</strong> <br />
                {productById.descripcion}
              </p>
              <p className="text-3xl font-bold text-orange-600 mt-5">
                $ {numberFormatter(productById.precio ?? 0)}
              </p>
            </div>

            {/* 💳 Métodos de pago */}
            <div className="grid">
              <p className="font-medium text-gray-700">Métodos de pago:</p>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <img src={LogoNequi} className="h-10" alt="Logo Nequi" />
                <img src={LogoBancolombia} className="h-10" alt="Logo Bancolombia" />
                <div className="flex flex-col items-center text-black">
                  <img src={LogoEfectivo} className="h-10" alt="Logo Efectivo" />
                  <p className="text-xs">Efectivo</p>
                </div>
              </div>
            </div>

            {/* 🚚 Envío */}
            <p className="inline-flex items-center gap-2 text-emerald-600 font-medium">
              <MdDeliveryDining className="text-3xl" /> Envío gratis
            </p>

            {/* 🔢 Cantidad y botón */}
            <div className="flex flex-col gap-4">
              <Quantity
                quantity={quantity}
                increment={() => setQuantity(quantity + 1)}
                decrement={() => setQuantity(quantity - 1 <= 0 ? 1 : quantity - 1)}
              />
              <ButtonCart
                text="Añadir al carrito"
                handleClick={() =>
                  addToCart({
                    descripcion: productById.descripcion,
                    nombre: productById.nombre,
                    precio: productById.precio,
                    imagen: productById.imagen,
                    quantity,
                  })
                }
              />
            </div>
          </article>
        </div>

        {/* 🥘 Productos similares */}
        {productsFiltered.length > 0 && (
          <ProductsSlider productsData={productsFiltered} title="Platos similares" />
        )}
      </div>
    </section>
  )
}

