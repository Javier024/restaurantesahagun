import { useFormik } from 'formik'
import { useState } from 'react'

interface Order {
  typeOrder: string
  tableNumber?: string
  fullName?: string
  phone?: string
  address?: string
  neighborhood?: string
  paymentMethod?: string
}

interface IProps {
  setOrder: (order: Order) => void
}

export function CheckOutForm({ setOrder }: IProps) {
  const [step, setStep] = useState(1)

  const formik = useFormik({
    initialValues: {
      typeOrder: '',
      tableNumber: '',
      fullName: '',
      phone: '',
      address: '',
      neighborhood: '',
      paymentMethod: 'cash',
    },
    onSubmit: (values) => {
      setOrder(values)
    },
  })

  const handleNext = () => {
    if (step === 1 && !formik.values.typeOrder) {
      alert('Seleccione un tipo de pedido')
      return
    }
    if (step === 2 && !formik.values.fullName) {
      alert('Ingrese su nombre completo')
      return
    }
    setStep(step + 1)
  }

  const handleBack = () => setStep(step - 1)

  return (
    <div className="fixed inset-0 grid place-items-center bg-gray-700/30 z-10 w-full">
      <article className="relative w-[90%] max-w-md bg-white shadow-lg rounded-xl py-6 px-5">
        <h1 className="text-2xl font-bold text-center mb-5">Datos del pedido</h1>

        {/* Indicador de pasos */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-2 w-8 rounded-full ${n <= step ? 'bg-orange-500' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>

        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          {/* Paso 1: tipo de pedido */}
          {step === 1 && (
            <div className="grid text-center">
              <p className="font-semibold mb-3">¿Cómo desea su pedido?</p>
              <label className="mb-1">
                <input
                  type="radio"
                  name="typeOrder"
                  value="onSite"
                  onChange={formik.handleChange}
                />{' '}
                Comer en el sitio
              </label>
              <label className="mb-1">
                <input
                  type="radio"
                  name="typeOrder"
                  value="takeaway"
                  onChange={formik.handleChange}
                />{' '}
                Para recoger
              </label>
              <label className="mb-4">
                <input
                  type="radio"
                  name="typeOrder"
                  value="atHome"
                  onChange={formik.handleChange}
                />{' '}
                A domicilio
              </label>

              <button
                type="button"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
                onClick={handleNext}
              >
                Siguiente
              </button>
            </div>
          )}

          {/* Paso 2: datos personales */}
          {step === 2 && (
            <div className="grid gap-2">
              <label>
                Nombre completo
                <input
                  type="text"
                  name="fullName"
                  className="w-full bg-gray-100 rounded-md p-2 mt-1"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                />
              </label>

              {formik.values.typeOrder === 'onSite' ? (
                <label>
                  Número de mesa
                  <input
                    type="text"
                    name="tableNumber"
                    className="w-full bg-gray-100 rounded-md p-2 mt-1"
                    onChange={formik.handleChange}
                    value={formik.values.tableNumber}
                  />
                </label>
              ) : (
                <label>
                  Celular
                  <input
                    type="text"
                    name="phone"
                    className="w-full bg-gray-100 rounded-md p-2 mt-1"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </label>
              )}

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: domicilio o confirmación */}
          {step === 3 && (
            <>
              {formik.values.typeOrder === 'atHome' ? (
                <div className="grid gap-2">
                  <label>
                    Barrio
                    <input
                      type="text"
                      name="neighborhood"
                      className="w-full bg-gray-100 rounded-md p-2 mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.neighborhood}
                    />
                  </label>
                  <label>
                    Dirección
                    <input
                      type="text"
                      name="address"
                      className="w-full bg-gray-100 rounded-md p-2 mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                  </label>
                  <label>
                    Método de pago
                    <select
                      name="paymentMethod"
                      className="w-full bg-gray-100 rounded-md p-2 mt-1"
                      onChange={formik.handleChange}
                      value={formik.values.paymentMethod}
                    >
                      <option value="cash">Efectivo</option>
                      <option value="transfer">Transferencia</option>
                    </select>
                  </label>
                </div>
              ) : (
                <p className="text-center text-gray-700 font-medium">
                  ¿Desea confirmar su pedido?
                </p>
              )}

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Confirmar
                </button>
              </div>
            </>
          )}
        </form>
      </article>
    </div>
  )
}
