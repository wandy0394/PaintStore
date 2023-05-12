import { useEffect, useState } from "react"
import { Cart } from "../../models/cart"
import { agent } from "../../app/api/agent"
import LoadingComponent from "../../layouts/LoadingComponent"

export default function CartPage() {
    
    const [loading, setLoading] = useState<boolean>(true)
    const [cart, setCart] = useState<Cart | null>(null)

    useEffect(()=>{
        agent.Cart.get()
            .then(cart=>setCart(cart))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message='Loading basket..'/>
    if (!cart) return <h1>Empty Cart</h1>
    return (
        <>
                BuyerId = {cart.buyerId}
        </>
    )
}