export interface IProduct {
  nombre: string
  descripcion: string
  precio: number
  categoría: string
  imagen: string
  stock: number
}

export interface IProductCart extends Partial<IProduct> {
  quantity: number
}
