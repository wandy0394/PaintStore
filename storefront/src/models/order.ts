
export interface Order {
  id: number
  buyerId: string
  shippingAddress: ShippingAddress
  orderDate: string
  orderItems: OrderItem[]
  subtotal: number
  shippingFee: number
  orderStatus: string
  total: number
}

export interface ShippingAddress {
  fullName: string
  address1: string
  address2: string
  city: string
  state: string
  zipcode: string
  country: string
}

export interface OrderItem {
  productId: number
  name: string
  imageUrl: string
  price: number
  quantity: number
}
