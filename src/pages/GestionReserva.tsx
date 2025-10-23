import { useState } from 'react'

interface ReservaData {
  id: string
  nombre: string
  email: string
  fecha: string
  hora: string
  personas: number
  comentarios: string
}

export default function GestionReserva() {
  const [reservas, setReservas] = useState<ReservaData[]>(
    JSON.parse(localStorage.getItem('reservas') || '[]')
  )
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<ReservaData | null>(null)

  const buscarReserva = () => {
    const encontrada = reservas.find(
      (r) => r.email === busqueda || r.id === busqueda
    )
    if (encontrada) setFiltro(encontrada)
    else alert('No se encontró ninguna reserva con ese ID o correo')
  }

  const actualizarReserva = (actualizada: ReservaData) => {
    const nuevas = reservas.map((r) => (r.id === actualizada.id ? actualizada : r))
    setReservas(nuevas)
    localStorage.setItem('reservas', JSON.stringify(nuevas))
    setFiltro(null)
  }

  const eliminarReserva = (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar esta reserva?')) return
    const nuevas = reservas.filter((r) => r.id !== id)
    setReservas(nuevas)
    localStorage.setItem('reservas', JSON.stringify(nuevas))
    setFiltro(null)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Reservas</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por ID o correo"
          className="border p-2 flex-1 rounded"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          onClick={buscarReserva}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {filtro && (
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Reserva encontrada</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={filtro.nombre}
              onChange={(e) => setFiltro({ ...filtro, nombre: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={filtro.email}
              onChange={(e) => setFiltro({ ...filtro, email: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={filtro.fecha}
              onChange={(e) => setFiltro({ ...filtro, fecha: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="time"
              value={filtro.hora}
              onChange={(e) => setFiltro({ ...filtro, hora: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={filtro.personas}
              onChange={(e) =>
                setFiltro({ ...filtro, personas: parseInt(e.target.value) })
              }
              className="border p-2 rounded"
            />
            <textarea
              value={filtro.comentarios}
              onChange={(e) =>
                setFiltro({ ...filtro, comentarios: e.target.value })
              }
              className="border p-2 rounded col-span-2"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => actualizarReserva(filtro)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Guardar cambios
            </button>
            <button
              onClick={() => eliminarReserva(filtro.id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
