import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // 🔐 Validación del usuario administrador
    if (usuario === 'admin' && clave === '12345') {
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('adminName', 'Javier')
      alert('✅ ¡Bienvenido Admin Javier!')
      navigate('/admin-dashboard') // ✅ Redirige al Dashboard
    } else {
      alert('❌ Usuario o contraseña incorrectos')
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-orange-200">
        <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">
          Ingreso de Administrador 🔐
        </h1>

        <form onSubmit={handleLogin} className="grid gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            className="bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-all"
          >
            Ingresar
          </button>
        </form>
      </div>
    </section>
  )
}
