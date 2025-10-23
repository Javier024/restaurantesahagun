import { useEffect, useState } from 'react'
import { useCartStore } from '../../store/useCartStore'
import { numberFormatter } from '../../utils/numberFormatter'
import { TotalOrder } from '../cart/TotalOrder'
import { toast } from 'sonner'

interface Order {
  typeOrder: string
  tableNumber?: string
  fullName?: string
  phone?: string
  address?: string
  neighborhood?: string
  paymentMethod?: string
}

interface IProps {
  orderData?: Order
}

export function Summary({ orderData }: IProps) {
  const cart = useCartStore((state) => state.cart)
  const [urlMessage, setUrlMessage] = useState('')

  useEffect(() => {
    if (orderData && cart.length) {
      let message = `🍽️ *Nuevo pedido*%0A%0A`
      message += `👤 *Cliente:* ${orderData.fullName || 'No especificado'}%0A`
      if (orderData.tableNumber) message += `🪑 *Mesa:* ${orderData.tableNumber}%0A`
      if (orderData.address) message += `🏠 *Dirección:* ${orderData.address}%0A`
      if (orderData.neighborhood) message += `📍 *Barrio:* ${orderData.neighborhood}%0A`
      if (orderData.phone) message += `📞 *Teléfono:* ${orderData.phone}%0A`
      if (orderData.paymentMethod) message += `💳 *Pago:* ${orderData.paymentMethod}%0A`

      const typeOrder =
        orderData.typeOrder === 'onSite'
          ? '🍴 Para comer en el lugar'
          : orderData.typeOrder === 'atHome'
          ? '🚚 A domicilio'
          : '🥡 Para llevar'
      message += `%0A📦 *Tipo de pedido:* ${typeOrder}%0A%0A`

      message += `🧾 *Detalles del pedido:*%0A`
      cart.forEach((item) => {
        message += `- ${item.nombre} ×${item.quantity}  $${numberFormatter(
          item.quantity * item.precio!
        )}%0A`
      })

      const total = cart.reduce((acc, item) => acc + item.precio! * item.quantity, 0)
      message += `%0A💰 *Total:* $${numberFormatter(total)}%0A%0A🙏 ¡Gracias por tu compra!`

      const number =
        orderData.typeOrder === 'atHome' ? '573016838490' : '573016838490' // Número de WhatsApp

      setUrlMessage(`https://wa.me/${number}?text=${encodeURIComponent(message)}`)
    }
  }, [orderData, cart])

  const handleSend = () => {
    if (!cart.length) {
      toast.warning('Tu carrito está vacío 🛒')
      return
    }

    // 🔹 Crear objeto del pedido
    const nuevoPedido = {
      id: Date.now(),
      cliente: orderData?.fullName || 'No especificado',
      telefono: orderData?.phone || 'N/A',
      direccion: orderData?.address || '',
      barrio: orderData?.neighborhood || '',
      metodoPago: orderData?.paymentMethod || '',
      tipo: orderData?.typeOrder || 'sin especificar',
      total: cart.reduce((acc, item) => acc + item.precio! * item.quantity, 0),
      items: cart.map((item) => ({
        nombre: item.nombre,
        cantidad: item.quantity,
        precio: item.precio,
      })),
      fecha: new Date().toLocaleString(),
      estado: 'Pendiente',
    }

    // 🔹 Guardar en localStorage
    const pedidosPrevios = JSON.parse(localStorage.getItem('pedidos') || '[]')
    pedidosPrevios.push(nuevoPedido)
    localStorage.setItem('pedidos', JSON.stringify(pedidosPrevios))

    window.open(urlMessage, '_blank')
    toast.success('Pedido enviado a WhatsApp 📲 y guardado en el panel admin')

    localStorage.removeItem('carrito')
  }

  return (
    <article className="md:sticky md:top-24 grid w-full h-fit max-w-md bg-white rounded-2xl shadow-xl p-5 border border-orange-200">
      <h1 className="text-2xl font-bold text-orange-700 text-center mb-4">
        🧾 Resumen del Pedido
      </h1>

      <div className="w-full">
        <div className="flex justify-between font-semibold text-gray-700 border-b pb-2 mb-2">
          <p>Item</p>
          <p>Cant.</p>
          <p>Total</p>
        </div>

        {cart.length > 0 ? (
          cart.map((item, i) => (
            <div
              key={item.nombre}
              className="flex justify-between text-sm text-gray-700 py-1 border-b border-dashed last:border-none"
            >
              <span>
                <em>{i + 1}.</em> {item.nombre}
              </span>
              <span>{item.quantity}</span>
              <span>$ {numberFormatter(item.quantity * item.precio!)}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic py-3">
            No hay productos en el pedido.
          </p>
        )}
      </div>

      <div className="grid place-items-center pt-4 border-t border-gray-300 mt-3">
        <TotalOrder cart={cart} />
        <button
          type="button"
          aria-label="Enviar pedido"
          onClick={handleSend}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all flex items-center gap-2 shadow-md"
        >
          <span>📲 Enviar por WhatsApp</span>
        </button>
      </div>
    </article>
  )
}
