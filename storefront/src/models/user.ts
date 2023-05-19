import { Cart } from "./cart"

export type User = {
    email:string,
    token:string,
    cart?:Cart
}