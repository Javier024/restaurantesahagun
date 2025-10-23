import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ReservaData {
  id: string
  nombre: string
  email: string
  fecha: string
  hora: string
  personas: number
  comentarios: string
  estado?: string
}

export default function AdminReservas() {
  const [reservas, setReservas] = useState<ReservaData[]>([])
  const [editando, setEditando] = useState<ReservaData | null>(null)
  const [enviandoMensaje, setEnviandoMensaje] = useState<ReservaData | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [adminName, setAdminName] = useState<string | null>(null)
  const navigate = useNavigate()

  // 🔹 Cargar reservas y verificar acceso admin
  useEffect(() => {
    const admin = localStorage.getItem('isAdmin')
    const name = localStorage.getItem('adminName')

    if (admin !== 'true') {
      navigate('/admin-login')
      return
    }

    setAdminName(name)
    const data = JSON.parse(localStorage.getItem('reservas') || '[]')
    setReservas(data)
  }, [navigate])

  // 🔹 Eliminar reserva
  const eliminarReserva = (id: string) => {
    const nuevas = reservas.filter((r) => r.id !== id)
    setReservas(nuevas)
    localStorage.setItem('reservas', JSON.stringify(nuevas))
  }

  // 🔹 Guardar edición
  const guardarEdicion = () => {
    if (!editando) return
    const actualizadas = reservas.map((r) =>
      r.id === editando.id ? editando : r
    )
    setReservas(actualizadas)
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
    setEditando(null)
  }

  // 🔹 Confirmar reserva y preparar mensaje
  const confirmarReserva = (id: string) => {
    const actualizadas = reservas.map((r) =>
      r.id === id ? { ...r, estado: 'confirmada' } : r
    )
    setReservas(actualizadas)
    localStorage.setItem('reservas', JSON.stringify(actualizadas))

    const reserva = actualizadas.find((r) => r.id === id)
    if (reserva) {
      setEnviandoMensaje(reserva)
      setMensaje(
        `Hola ${reserva.nombre}, tu reserva para el ${reserva.fecha} a las ${reserva.hora} ha sido confirmada. ¡Te esperamos!`
      )
    }
  }

  // 🔹 Notificar sin disponibilidad
  const rechazarReserva = (id: string) => {
    const reserva = reservas.find((r) => r.id === id)
    if (reserva) {
      setEnviandoMensaje(reserva)
      setMensaje(
        `Hola ${reserva.nombre}, lamentamos informarte que no hay disponibilidad para tu reserva del ${reserva.fecha} a las ${reserva.hora}.`
      )
    }
  }

  // 🔹 Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('adminName')
    navigate('/admin-login')
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-orange-700">
            📋 Panel de Reservas
          </h2>
          <p className="text-gray-600 mt-1">
            👋 Bienvenido {adminName || 'Administrador'}
          </p>
        </div>

        <button
          onClick={cerrarSesion}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
        >
          Cerrar sesión
        </button>
      </div>

      {reservas.length === 0 ? (
        <p className="text-gray-600">No hay reservas registradas.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-orange-200 text-left">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Hora</th>
              <th className="border p-2">Personas</th>
              <th className="border p-2">Comentarios</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
              <tr key={r.id} className="border-t hover:bg-orange-50">
                <td className="border p-2">{r.nombre}</td>
                <td className="border p-2">{r.email}</td>
                <td className="border p-2">{r.fecha}</td>
                <td className="border p-2">{r.hora}</td>
                <td className="border p-2 text-center">{r.personas}</td>
                <td className="border p-2">{r.comentarios}</td>
                <td className="border p-2 text-center">
                  {r.estado || 'Pendiente'}
                </td>
                <td className="border p-2 flex gap-2 justify-center flex-wrap">
                  <button
                    onClick={() => confirmarReserva(r.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => rechazarReserva(r.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Sin disponibilidad
                  </button>
                  <button
                    onClick={() => setEditando(r)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarReserva(r.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de edición */}
      {editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold text-orange-700 mb-4">
              Editar Reserva
            </h3>

            <input
              type="text"
              value={editando.nombre}
              onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
              placeholder="Nombre"
            />

            <input
              type="email"
              value={editando.email}
              onChange={(e) => setEditando({ ...editando, email: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
              placeholder="Correo"
            />

            <input
              type="date"
              value={editando.fecha}
              onChange={(e) => setEditando({ ...editando, fecha: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
            />

            <input
              type="time"
              value={editando.hora}
              onChange={(e) => setEditando({ ...editando, hora: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
            />

            <input
              type="number"
              value={editando.personas}
              onChange={(e) =>
                setEditando({ ...editando, personas: Number(e.target.value) })
              }
              className="border p-2 w-full mb-3 rounded"
            />

            <textarea
              value={editando.comentarios}
              onChange={(e) =>
                setEditando({ ...editando, comentarios: e.target.value })
              }
              className="border p-2 w-full mb-3 rounded"
              placeholder="Comentarios"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditando(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEdicion}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para enviar mensaje */}
      {enviandoMensaje && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold text-orange-700 mb-4">
              Enviar mensaje a {enviandoMensaje.nombre}
            </h3>

            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
              placeholder="Escribe tu mensaje..."
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEnviandoMensaje(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert(`📨 Mensaje enviado a ${enviandoMensaje.email}:\n\n${mensaje}`)
                  setEnviandoMensaje(null)
                }}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
