import Logo from '@/assets/logo2.png'
import { BiMenu } from 'react-icons/bi'
import { GiHotMeal } from 'react-icons/gi'
import { FaUserShield } from 'react-icons/fa' // 🔹 Nuevo icono admin
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { CartModal } from '../cart/CartModal'
import { useState } from 'react'
import clsx from 'clsx'
import { RoutesPath } from '@/routes/routes'

export default function Header() {
  const count = useCartStore((state) => state.count)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky z-20 top-0 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-5 py-3 relative">
        {/* Logo */}
        <Link to={RoutesPath.home}>
          <div className="grid place-items-center overflow-hidden aspect-[16/7] w-32 rounded-lg">
            <img src={Logo} alt="Logo" className="h-full object-cover -mt-7 z-30" />
          </div>
        </Link>

        {/* 🖥️ Menú Desktop */}
        <nav className="hidden md:flex items-center gap-6 font-semibold text-orange-800">
          <Link to={RoutesPath.home} className="hover:text-orange-500 transition-colors">
            Inicio
          </Link>
          <Link to={RoutesPath.menu} className="hover:text-orange-500 transition-colors">
            Menú
          </Link>
          <Link to={RoutesPath.reserve} className="hover:text-orange-500 transition-colors">
            Reservas
          </Link>
          <Link to={RoutesPath.contact} className="hover:text-orange-500 transition-colors">
            Contacto
          </Link>
          <Link to="/gestion-reserva" className="hover:text-orange-500 transition-colors">
            Gestionar Reserva
          </Link>
        </nav>

        {/* 📱 Menú Móvil */}
        <nav
          className={clsx(
            'fixed inset-x-0 top-0 bg-white shadow-md md:hidden z-10 transition-transform duration-300 ease-in-out',
            openMenu ? 'translate-y-16' : '-translate-y-full'
          )}
        >
          <ul className="flex flex-col items-center py-6 gap-4 font-semibold text-orange-800">
            <li><Link to={RoutesPath.home} onClick={() => setOpenMenu(false)}>Inicio</Link></li>
            <li><Link to={RoutesPath.menu} onClick={() => setOpenMenu(false)}>Menú</Link></li>
            <li><Link to={RoutesPath.reserve} onClick={() => setOpenMenu(false)}>Reservas</Link></li>
            <li><Link to={RoutesPath.contact} onClick={() => setOpenMenu(false)}>Contacto</Link></li>
            <li><Link to="/gestion-reserva" onClick={() => setOpenMenu(false)}>Gestionar Reserva</Link></li>
            <li><Link to="/admin-login" onClick={() => setOpenMenu(false)}>Admin</Link></li>
          </ul>
        </nav>

        {/* 🛒 Icono del carrito y botón admin */}
        <div className="flex items-center gap-4">
          {/* Botón Admin con ícono */}
          <button
            onClick={() => navigate('/admin-login')}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm font-semibold hidden md:flex transition-all"
          >
            <FaUserShield size={16} /> {/* Icono admin */}
            Admin
          </button>

          {/* Botón carrito */}
          <button
            type="button"
            className="relative"
            onClick={() => setOpen(!open)}
          >
            <GiHotMeal size={30} className="text-gray-700 hover:text-orange-600 transition-colors" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs text-gray-600 font-bold bg-orange-300 rounded-full size-5 grid place-items-center">
                {count}
              </span>
            )}
          </button>

          {/* Botón menú móvil */}
          <button
            type="button"
            className="block md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <BiMenu size={30} />
          </button>
        </div>

        {/* Fondo del carrito */}
        <div
          className={clsx('fixed inset-0 bg-gray-900/30', { hidden: !open })}
          onClick={() => setOpen(false)}
        />

        {/* Modal del carrito */}
        <CartModal open={open} setOpen={setOpen} />
      </div>
    </header>
  )
}
