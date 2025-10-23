import { Route, Routes, Navigate } from 'react-router-dom'
import AppLayout from '../layouts/App.layout'

import Home from '../pages/Home'
import Menu from '../pages/Menu'
import MenuDetail from '../pages/MenuDetail'
import CheckOut from '../pages/CheckOut'
import Reserve from '../pages/Reserve'
import Contact from '../pages/Contact'
import Resenas from '../pages/Resenas'
import GestionReserva from '../pages/GestionReserva'
import AdminReservas from '../pages/AdminReservas'
import AdminLogin from '../pages/AdminLogin'
import AdminDashboard from '../pages/AdminDashboard' // ✅ Nuevo

import { RoutesPath } from './routes'

// 🔒 Componente de protección de ruta admin
function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  return isAdmin ? children : <Navigate to={RoutesPath.adminLogin} replace />
}

export default function MainRoutes() {
  return (
    <Routes>
      {/* Layout general del sitio */}
      <Route element={<AppLayout />}>
        <Route path={RoutesPath.home} element={<Home />} />
        <Route path={RoutesPath.menu} element={<Menu />} />
        <Route path={RoutesPath.menuDetail(':id')} element={<MenuDetail />} />
        <Route path={RoutesPath.checkout} element={<CheckOut />} />
        <Route path={RoutesPath.reserve} element={<Reserve />} />
        <Route path={RoutesPath.contact} element={<Contact />} />
        <Route path={RoutesPath.reseñas} element={<Resenas />} />
        <Route path={RoutesPath.gestionReserva} element={<GestionReserva />} />

        {/* 🔒 Rutas de administrador */}
        <Route path={RoutesPath.adminLogin} element={<AdminLogin />} />
        <Route
          path={RoutesPath.adminReservas}
          element={
            <ProtectedAdminRoute>
              <AdminReservas />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path={RoutesPath.adminDashboard}
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
      </Route>
    </Routes>
  )
}
