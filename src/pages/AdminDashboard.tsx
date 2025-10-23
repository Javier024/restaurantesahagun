import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'reservas' | 'pedidos'>('reservas')
  const [reservas, setReservas] = useState<any[]>([])
  const [pedidos, setPedidos] = useState<any[]>([])
  const [adminName, setAdminName] = useState<string>('')

  useEffect(() => {
    const reservasData = JSON.parse(localStorage.getItem('reservas') || '[]')
    const pedidosData = JSON.parse(localStorage.getItem('pedidos') || '[]')
    const name = localStorage.getItem('adminName') || 'Administrador'
    setReservas(reservasData)
    setPedidos(pedidosData)
    setAdminName(name)
  }, [])

  // ---------------------- 🔹 RESERVAS ----------------------
  const eliminarReserva = (id: string) => {
    const nuevas = reservas.filter((r) => r.id !== id)
    setReservas(nuevas)
    localStorage.setItem('reservas', JSON.stringify(nuevas))
    toast.success('Reserva eliminada ❌')
  }

  const confirmarReserva = (id: string) => {
    const actualizadas = reservas.map((r) =>
      r.id === id ? { ...r, estado: 'confirmada' } : r
    )
    setReservas(actualizadas)
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
    toast.success('Reserva confirmada ✅')

    const reserva = actualizadas.find((r) => r.id === id)
    enviarMensajeWhatsApp(
      reserva?.telefono,
      `✅ Hola ${reserva?.nombre}, tu reserva para el ${reserva?.fecha} a las ${reserva?.hora} ha sido *confirmada*. ¡Te esperamos! 🍽️`
    )
  }

  const marcarNoDisponible = (id: string) => {
    const actualizadas = reservas.map((r) =>
      r.id === id ? { ...r, estado: 'no disponible' } : r
    )
    setReservas(actualizadas)
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
    toast.error('Marcada como no disponible ⚠️')

    const reserva = actualizadas.find((r) => r.id === id)
    enviarMensajeWhatsApp(
      reserva?.telefono,
      `⚠️ Hola ${reserva?.nombre}, lamentablemente no tenemos disponibilidad para tu reserva del ${reserva?.fecha} a las ${reserva?.hora}. 🙏`
    )
  }

  const enviarMensajeWhatsApp = (telefono?: string, mensaje?: string) => {
    if (!telefono) {
      toast.error('El cliente no tiene teléfono registrado.')
      return
    }
    if (!mensaje) {
      toast.error('Escribe un mensaje antes de enviar.')
      return
    }
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  // ---------------------- 🔹 PEDIDOS ----------------------
  const eliminarPedido = (id: number) => {
    const nuevos = pedidos.filter((p) => p.id !== id)
    setPedidos(nuevos)
    localStorage.setItem('pedidos', JSON.stringify(nuevos))
    toast.success('Pedido eliminado 🗑️')
  }

  const actualizarEstadoPedido = (id: number, nuevoEstado: string) => {
    const actualizados = pedidos.map((p) =>
      p.id === id ? { ...p, estado: nuevoEstado } : p
    )
    setPedidos(actualizados)
    localStorage.setItem('pedidos', JSON.stringify(actualizados))
    toast.success(`Estado actualizado a ${nuevoEstado}`)

    const pedido = actualizados.find((p) => p.id === id)
    if (nuevoEstado === 'Entregado') {
      enviarMensajeWhatsApp(
        pedido?.telefono,
        `📦 Hola ${pedido?.cliente}, tu pedido ha sido *entregado exitosamente*. ¡Gracias por tu compra! 🙌`
      )
    } else if (nuevoEstado === 'Cancelado') {
      enviarMensajeWhatsApp(
        pedido?.telefono,
        `⚠️ Hola ${pedido?.cliente}, tu pedido ha sido *cancelado*. Si fue un error, por favor contáctanos. 🙏`
      )
    }
  }

  // 🔹 Mensaje personalizado (para reservas o pedidos)
  const [mensajePersonalizado, setMensajePersonalizado] = useState('')
  const [itemSeleccionado, setItemSeleccionado] = useState<any | null>(null)

  const abrirMensajePersonalizado = (item: any) => {
    setItemSeleccionado(item)
    setMensajePersonalizado('')
  }

  const enviarMensajePersonalizado = () => {
    if (itemSeleccionado) {
      enviarMensajeWhatsApp(itemSeleccionado.telefono, mensajePersonalizado)
      setItemSeleccionado(null)
      setMensajePersonalizado('')
    }
  }

  return (
    <section className="min-h-screen bg-orange-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-700">
          Panel de Administración 📊
        </h1>
        <p className="text-gray-700">Bienvenido {adminName}</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('reservas')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === 'reservas'
              ? 'bg-orange-600 text-white'
              : 'bg-white border text-orange-600'
          }`}
        >
          Reservas
        </button>
        <button
          onClick={() => setActiveTab('pedidos')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === 'pedidos'
              ? 'bg-orange-600 text-white'
              : 'bg-white border text-orange-600'
          }`}
        >
          Pedidos
        </button>
      </div>

      {/* -------------------- TAB RESERVAS -------------------- */}
      {activeTab === 'reservas' ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">📅 Reservas</h2>
          {reservas.length === 0 ? (
            <p>No hay reservas registradas.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-orange-200">
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Teléfono</th>
                  <th className="border p-2">Fecha</th>
                  <th className="border p-2">Hora</th>
                  <th className="border p-2">Personas</th>
                  <th className="border p-2">Estado</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((r) => (
                  <tr key={r.id}>
                    <td className="border p-2">{r.nombre}</td>
                    <td className="border p-2">{r.telefono || '-'}</td>
                    <td className="border p-2">{r.fecha}</td>
                    <td className="border p-2">{r.hora}</td>
                    <td className="border p-2">{r.personas}</td>
                    <td
                      className={`border p-2 text-center font-semibold ${
                        r.estado === 'confirmada'
                          ? 'text-green-600'
                          : r.estado === 'no disponible'
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {r.estado || 'Pendiente'}
                    </td>
                    <td className="border p-2 text-center space-x-2">
                      <button
                        onClick={() => confirmarReserva(r.id)}
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => marcarNoDisponible(r.id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        No disp.
                      </button>
                      <button
                        onClick={() => abrirMensajePersonalizado(r)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Enviar msg
                      </button>
                      <button
                        onClick={() => eliminarReserva(r.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        // -------------------- TAB PEDIDOS --------------------
        <div>
          <h2 className="text-2xl font-bold mb-4">🧾 Pedidos</h2>
          {pedidos.length === 0 ? (
            <p>No hay pedidos registrados.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-orange-200">
                  <th className="border p-2">Cliente</th>
                  <th className="border p-2">Teléfono</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Método de pago</th>
                  <th className="border p-2">Pedido</th>
                  <th className="border p-2">Estado</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p) => (
                  <tr key={p.id}>
                    <td className="border p-2">{p.cliente}</td>
                    <td className="border p-2">{p.telefono}</td>
                    <td className="border p-2">${p.total}</td>
                    <td className="border p-2">{p.metodoPago}</td>
                    <td className="border p-2">
                      {p.items?.map((item: any, i: number) => (
                        <div key={i}>
                          - {item.nombre} × {item.cantidad}
                        </div>
                      ))}
                    </td>
                    <td
                      className={`border p-2 text-center font-semibold ${
                        p.estado === 'Entregado'
                          ? 'text-green-600'
                          : p.estado === 'Cancelado'
                          ? 'text-red-500'
                          : 'text-gray-600'
                      }`}
                    >
                      {p.estado || 'Pendiente'}
                    </td>
                    <td className="border p-2 text-center space-x-2">
                      <button
                        onClick={() => actualizarEstadoPedido(p.id, 'Entregado')}
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Entregado
                      </button>
                      <button
                        onClick={() => actualizarEstadoPedido(p.id, 'Cancelado')}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => abrirMensajePersonalizado(p)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Enviar msg
                      </button>
                      <button
                        onClick={() => eliminarPedido(p.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* 🔹 Modal mensaje personalizado */}
      {itemSeleccionado && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold text-orange-700 mb-4">
              Enviar mensaje a {itemSeleccionado.nombre || itemSeleccionado.cliente}
            </h3>
            <textarea
              value={mensajePersonalizado}
              onChange={(e) => setMensajePersonalizado(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="w-full border rounded p-2 mb-3"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setItemSeleccionado(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={enviarMensajePersonalizado}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
