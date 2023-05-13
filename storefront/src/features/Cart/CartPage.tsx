import { useEffect, useState } from "react"
import { Cart, CartItem } from "../../models/cart"
import { agent } from "../../app/api/agent"
import LoadingComponent from "../../layouts/LoadingComponent"
import QuantityCounter from "../catalog/QuantityCounter"
import './styles/cart-page-styles.css'
import { useStoreContext } from "../../app/context/StoreContext"
import LoadingButton from "../../components/LoadingButton"
export default function CartPage() {
    
    // const [loading, setLoading] = useState<boolean>(true)
    // const [cart, setCart] = useState<Cart | null>(null)
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const {cart, setCart, removeItem} = useStoreContext()

    function calculateTotal(cart:Cart) {
        let newTotal:number = cart.items.reduce((sum:number, item:CartItem)=>{
            return sum = sum + item.price*item.quantity
        }, 0)
        
        setTotal(newTotal/100)
    }
    useEffect(()=>{
        if (cart) {
            calculateTotal(cart)
        }
    }, [cart])

    function removeItemFromCart(productId:number, quantity:number=1) {
        setLoading(true)
        agent.Cart.removeItem(productId)
            .then(()=>{
                console.log('removing')
                removeItem(productId, quantity)
            })
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
        // removeItem(productId)
    }

    function handleAddItem(productId:number) {
        setLoading(true)
        agent.Cart.addItem(productId)
            .then(cart=>setCart(cart))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    }

    if (!cart) return <h1>Empty Cart</h1>
    return (
        <div className='w-full h-full py-8 px-24 flex flex-col gap-2 items-center justify-start'>
            <div className='w-full'>
                <h2 className='text-2xl'>Your Cart</h2>
            </div>
            <div className="overflow-x-auto w-full h-full">
                <table className="table w-full h-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th> {/* Image */}
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Sub-Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cart.items.map((item, index)=>{
                            return (
                                <tr>
                                    <th>{index+1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-16 rounded-full">
                                                <img src={item.imageUrl} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        <QuantityCounter 
                                            value={item.quantity} 
                                            handleDecrement={()=>removeItemFromCart(item.productId)}
                                            handleIncrement={()=>handleAddItem(item.productId)}
                                        />
                                    </td>
                                    <td>${(item.price / 100).toFixed(2)}</td>
                                    <td>${(item.price / 100 * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <div className='btn btn-error btn-sm' onClick={()=>removeItemFromCart(item.productId, item.quantity)}>DEL</div>
                                        {/* <LoadingButton loading={loading}>
                                        </LoadingButton> */}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <th></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th>Total</th>
                        <td>${total}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
        </div>
    )
}