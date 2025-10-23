import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
      <Toaster
        toastOptions={{
          style: { padding: '15px' },
          className: 'my-toast',
        }}
        position="top-center"
      />
    </BrowserRouter>
  )
}
