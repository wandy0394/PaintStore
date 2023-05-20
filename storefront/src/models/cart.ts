export interface Cart {
    id: number
    buyerId: string
    items: CartItem[],
    paymentIntentId?: string,
    clientSecret?:string
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
  