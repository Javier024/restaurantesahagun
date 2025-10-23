import { Outlet } from 'react-router-dom'
import Header from '../components/core/Header'

function AppLayout() {
  return (
    <>
      <Header />
      <main className="grid w-full grow content-start">
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
