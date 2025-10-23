import { useState } from 'react'
import fondoComida from '../assets/fondo-comida.png'

export default function Reserva() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: 1,
    comentarios: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const reserva = {
      id: Date.now().toString(),
      ...form,
      estado: 'pendiente', // 👈 Estado inicial para el panel admin
    }

    // Guardar en localStorage
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas') || '[]')
    reservasGuardadas.push(reserva)
    localStorage.setItem('reservas', JSON.stringify(reservasGuardadas))

    alert(
      `✅ Reserva confirmada para ${form.nombre} el ${form.fecha} a las ${form.hora}\n📞 Teléfono: ${form.telefono}\n👥 Personas: ${form.personas}\n📝 Comentarios: ${form.comentarios || 'Ninguno'}`
    )

    setForm({
      nombre: '',
      email: '',
      telefono: '',
      fecha: '',
      hora: '',
      personas: 1,
      comentarios: '',
    })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%), 
          url(${fondoComida})
        `,
        backgroundBlendMode: 'multiply',
      }}
    >
      <div
        className="relative z-10 bg-white/85 backdrop-blur-md shadow-2xl 
        rounded-3xl p-8 md:p-10 w-full max-w-lg border border-orange-200/60"
      >
        <h1 className="text-4xl font-bold text-center text-orange-700 mb-6 drop-shadow-lg">
          Reserva tu Mesa 🍽️
        </h1>

        <p className="text-center text-gray-700 mb-8">
          <span className="font-semibold text-orange-600">Horario de atención:</span>
          <br />
          Lunes a Domingo de <strong>10:00 AM</strong> a <strong>10:00 PM</strong>
        </p>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* NOMBRE */}
          <div>
            <label className="block text-sm font-semibold text-orange-800 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Laura Martínez"
              className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 
              placeholder-orange-400 bg-white/95 focus:bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              outline-none transition-all duration-300"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-orange-800 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Ej: laura@gmail.com"
              className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 
              placeholder-orange-400 bg-white/95 focus:bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              outline-none transition-all duration-300"
            />
          </div>

          {/* TELÉFONO */}
          <div>
            <label className="block text-sm font-semibold text-orange-800 mb-2">
              Teléfono de contacto
            </label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
              placeholder="Ej: 3001234567"
              pattern="[0-9]{10,}"
              className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 
              placeholder-orange-400 bg-white/95 focus:bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              outline-none transition-all duration-300"
            />
          </div>

          {/* FECHA */}
          <div>
            <label className="block text-sm font-semibold text-orange-800 mb-2">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 
              bg-white/95 focus:bg-white focus:border-orange-500 
              focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300"
            />
          </div>

          {/* HORA */}
          <div>
            <label className="block text-sm font-semibold text-orange-800 mb-2">
              Hora
            </label>
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              required
              min="10:00"
              max="22:00"
              step="900"
              className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 
              bg-white/95 focus:bg-white focus:border-orange-500 
              focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300"
            />
            <p className="text-xs text-gray-600 mt-1">
              ⏰ Disponible entre 10:00 AM y 10:00 PM
            </p>
          </div>

          {/* PERSONAS */}
          <div>
            <label className="block text-sm font-semibold text-orange-800 mb-2">
              Número de personas
            </label>
            <input
              type="number"
              name="personas"
              value={form.personas}
              onChange={handleChange}
              min={1}
              max={12}
              required
              className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 
              bg-white/95 focus:bg-white focus:border-orange-500 
              focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300"
            />
          </div>

          {/* COMENTARIOS */}
          <div>
            <label className="block text-sm font-semibold text-orange-800 mb-2">
              Comentarios o peticiones especiales
            </label>
            <textarea
              name="comentarios"
              value={form.comentarios}
              onChange={handleChange}
              placeholder="Ej: Prefiero una mesa cerca de la ventana..."
              rows={4}
              className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 
              placeholder-orange-400 bg-white/95 focus:bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              outline-none resize-none transition-all duration-300"
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 
            text-white font-semibold py-3 rounded-xl shadow-md 
            hover:from-orange-600 hover:to-orange-700 
            active:scale-95 transition-all duration-300"
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </section>
  )
}
