export const RoutesPath = {
  home: '/',
  menu: '/menu',
  menuDetail: (id: string) => `/menu/${id}`,
  checkout: '/checkout',
  reserve: '/reservas',
  contact: '/contacto',
  reseñas: '/resenas',
  gestionReserva: '/gestion-reserva',
  adminLogin: '/admin-login',
  adminReservas: '/admin-reservas',
  adminPedidos: '/admin-pedidos',
  adminDashboard: '/admin-dashboard', // ✅ Agrega esta línea
}
