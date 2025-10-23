import { useState, useEffect } from 'react'
import menuData from '../../mockData/mock_data.json'
import { ProductCard } from '../core/ProductCard'

export function ProductsSection() {
  const categorias = Array.from(
    new Set(menuData.map((item) => item.categoría || 'Otros'))
  )

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todos')
  const [productosFiltrados, setProductosFiltrados] = useState(menuData)
  const [isFading, setIsFading] = useState(false)

  // 🔄 Maneja el cambio de categoría con transición
  useEffect(() => {
    setIsFading(true)

    const timeout = setTimeout(() => {
      if (categoriaSeleccionada === 'Todos') setProductosFiltrados(menuData)
      else
        setProductosFiltrados(
          menuData.filter((item) => item.categoría === categoriaSeleccionada)
        )
      setIsFading(false)
    }, 300) // duración de la animación

    return () => clearTimeout(timeout)
  }, [categoriaSeleccionada])

  return (
    <section className="section-page mt-10">
      {/* 🏷️ Título */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Nuestro Menú</h2>
        <p className="text-gray-500 text-sm md:text-base">
          Explora nuestras deliciosas opciones disponibles 🍽️
        </p>
      </div>

      {/* 🧭 Botones de categorías */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setCategoriaSeleccionada('Todos')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            categoriaSeleccionada === 'Todos'
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todos
        </button>

        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              categoriaSeleccionada === cat
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🧩 Grid de productos con animación */}
      <div
        className={`grid content-center justify-items-center gap-5 w-full px-3
                    sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
                    transition-all duration-500 ease-in-out
                    ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item) => (
            <ProductCard key={item.nombre} {...item} id={item.nombre} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No hay productos en esta categoría.
          </p>
        )}
      </div>

      {/* 🌟 Botón final */}
      <div className="flex justify-center mt-10">
        <a
          href="/menu"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300"
        >
          Ver menú completo
        </a>
      </div>
    </section>
  )
}
