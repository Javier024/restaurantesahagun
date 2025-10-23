import { useState } from 'react'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import Reseñas from './Resenas'


export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })

  // ✅ Tipos correctos para TypeScript
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`📨 Gracias ${form.nombre}, tu mensaje fue enviado correctamente.`)
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="bg-white/95 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-700 mb-6">
          Sobre Nosotros 🍽️
        </h1>
        <p className="text-center text-gray-700 mb-8 leading-relaxed">
          En <strong>Restaurante Sabor y Origen</strong> creemos en la buena comida y el excelente servicio.
          Nuestra misión es ofrecer experiencias únicas en cada plato, usando ingredientes frescos y recetas tradicionales con un toque moderno.
        </p>

        {/* 📞 Información principal */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* 🧭 Datos de contacto */}
          <div>
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Información</h2>
            <ul className="space-y-3 text-gray-700">
              <li>📍 <strong>Dirección:</strong> Avenida al hospital, Sahagún - Córdoba</li>
              <li>📞 <strong>Teléfono:</strong> <a href="tel:+573001234567" className="text-orange-600 hover:underline">+57 300 123 4567</a></li>
              <li>📧 <strong>Email:</strong> <a href="mailto:info@restaurante.com" className="text-orange-600 hover:underline">info@restaurante.com</a></li>
            </ul>

            {/* 🕓 Horario */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Horario de Atención 🕒</h3>
              <p>Lunes a Domingo: <strong>10:00 AM - 10:00 PM</strong></p>
            </div>

            {/* 🌐 Redes sociales */}
            <div className="mt-10 text-center">
              <h3 className="text-2xl font-semibold text-orange-600 mb-4">Contáctanos 📬</h3>
              <p className="text-gray-700 mb-3">
                ¡Queremos saber de ti! Escríbenos, visítanos o síguenos en redes sociales.
              </p>

              <div className="flex justify-center gap-6 text-3xl">
                <a
                  href="#"
                  title="Instagram"
                  className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  title="Facebook"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  title="WhatsApp"
                  className="text-gray-600 hover:text-green-500 transition-colors duration-300"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* ✉️ Formulario */}
          <div>
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Tu correo electrónico"
                className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
                className="w-full rounded-xl border border-orange-300 px-4 py-3 text-orange-900 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all duration-300"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        {/* 🗺️ Mapa */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center text-orange-600 mb-4">Encuéntranos aquí 📍</h2>
          <div className="w-full h-64 rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="Ubicación del restaurante"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.7084375432424!2d-74.08083322578918!3d4.651868595338637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99bcd46b6a9f%3A0x4b9c8e672e65dc91!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1713126587612!5m2!1ses!2sco"
              width="100%"
              height="100%"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      {/* 🧡 Sección de reseñas dentro de la página de contacto */}
<div className="mt-16">
  <Reseñas />
</div>

    </section>
  )
}
