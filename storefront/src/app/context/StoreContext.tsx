import { Cart, CartItem } from "../../models/cart"
import {createContext, useContext, PropsWithChildren, useState} from 'react'
type StoreContextValue = {
    cart: Cart|null
    setCart: (cart:Cart) => void
    removeItem: (productId:number, quantity:number) => void
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined)


export function useStoreContext() {
    const context = useContext(StoreContext)
    if (context === undefined) {
        throw new Error('Context is undefined. Hook called uutside context provider')
    }

    return context
}

export function StoreProvider({children}:PropsWithChildren<any>) {
    const [cart, setCart] = useState<Cart | null>(null)

    function removeItem(productId:number, quantity:number) {
        if (!cart) return
        const items:CartItem[] = [...cart.items]

        const itemIndex:number = items.findIndex(i=>i.productId==productId)
        if (itemIndex == -1) return
        items[itemIndex].quantity -= quantity
        if (items[itemIndex].quantity <= 0) {
            items.splice(itemIndex, 1)
            setCart(prevState=>{
                return {...prevState, items:items}
            })
        }

    }

    return (
        <StoreContext.Provider value={{cart, setCart, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}