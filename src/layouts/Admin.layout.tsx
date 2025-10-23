export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-700 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center">Panel Admin</h1>

          <nav className="grid gap-4">
            <a
              href="/admin/dashboard"
              className="hover:text-orange-200 transition-colors"
            >
              📋 Reservas
            </a>

            <a
              href="/admin/pedidos"
              className="hover:text-orange-200 transition-colors"
            >
              🛍️ Pedidos
            </a>
          </nav>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('adminLogueado')
            window.location.href = '/admin/login'
          }}
          className="mt-8 bg-white text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-100 transition-all"
        >
          🚪 Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 bg-orange-50">{children}</main>
    </div>
  )
}
