export interface Cart {
    id: number
    buyerId: string
    items: CartItem[]
  }
  
  export interface CartItem {
    productId: number
    name: string
    price: number
    imageUrl: string
    brand: string
    productType: string
    quantity: number
  }
  