import { useState } from 'react'

export default function Reseñas() {
  const [reseñas, setReseñas] = useState([
    { nombre: 'Ana Gómez', estrellas: 5, comentario: 'Excelente comida y atención.' },
    { nombre: 'Carlos Ruiz', estrellas: 4, comentario: 'Buen ambiente, volveré pronto.' },
  ])

  const [form, setForm] = useState({
    nombre: '',
    estrellas: 5,
    comentario: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.comentario) {
      alert('Por favor completa todos los campos.')
      return
    }

    setReseñas((prev) => [...prev, { ...form, estrellas: Number(form.estrellas) }])
    setForm({ nombre: '', estrellas: 5, comentario: '' })
    alert(`Gracias ${form.nombre}, tu reseña fue enviada correctamente ✨`)
  }

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-orange-50 to-white rounded-t-3xl">
      {/* Título principal */}
      <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-12 drop-shadow-sm">
        ⭐ Reseñas de nuestros clientes
      </h2>

      {/* 📋 Lista de reseñas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {reseñas.map((r, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 
                       hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <p className="text-lg font-semibold text-orange-800">{r.nombre}</p>
            <div className="flex text-yellow-400 text-xl mb-2">
              {'★'.repeat(r.estrellas)}{'☆'.repeat(5 - r.estrellas)}
            </div>
            <p className="text-gray-700 italic leading-relaxed">“{r.comentario}”</p>
          </div>
        ))}
      </div>

      {/* 📝 Formulario para dejar reseña */}
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md border border-orange-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition">
        <h3 className="text-2xl font-bold text-center text-orange-700 mb-6">
          ¡Déjanos tu opinión!
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-3">
            <label className="font-medium text-orange-800">Tu nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej. María López"
              value={form.nombre}
              onChange={handleChange}
              className="border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium text-orange-800">Calificación</label>
            <select
              name="estrellas"
              value={form.estrellas}
              onChange={handleChange}
              className="border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none transition"
            >
              <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
              <option value="4">⭐⭐⭐⭐ Muy bueno</option>
              <option value="3">⭐⭐⭐ Regular</option>
              <option value="2">⭐⭐ Malo</option>
              <option value="1">⭐ Muy malo</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium text-orange-800">Tu comentario</label>
            <textarea
              name="comentario"
              placeholder="Cuéntanos tu experiencia..."
              value={form.comentario}
              onChange={handleChange}
              rows={3}
              className="border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none resize-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-3 rounded-xl 
                       shadow-md hover:bg-orange-700 active:scale-95 transition-transform"
          >
            Enviar reseña ✍️
          </button>
        </form>
      </div>
    </section>
  )
}
