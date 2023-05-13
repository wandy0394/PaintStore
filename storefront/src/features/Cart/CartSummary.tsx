import {useEffect, useState} from 'react'
import { Cart, CartItem } from "../../models/cart"
import { formatCurrency } from "../../app/util/util"
import { useAppSelecter } from "../../app/store/configureStore"

const SHIPPING_FEE:number = 1299
const FREE_SHIPPING_THRESH:number = 10000
const th_style = `text-right`
export default function CartSummary() {
    const [subtotal, setSubtotal] = useState<number>(0)
    const [total,setTotal] = useState<number>(0)

    const {cart} = useAppSelecter(state=>state.cart)
    function calculateTotal(cart:Cart) {
        let newTotal:number = cart?.items.reduce((sum:number, item:CartItem)=>{
            return sum = sum + item.price*item.quantity
        }, 0)
        
        setSubtotal(newTotal)
    }
    useEffect(()=>{
        if (cart) {
            calculateTotal(cart)
        }
    }, [cart])

    useEffect(()=>{
        if (subtotal > FREE_SHIPPING_THRESH) {
            setTotal(subtotal)
        }
        else {
            setTotal(subtotal + SHIPPING_FEE)
        }
    }, [subtotal])

    return (
        <table className='table w-full h-full'>
            {/* <thead>
                <th></th>
                <th></th>
            </thead> */}
            <tbody>
                <tr>
                    <th className={th_style}>Subtotal</th>
                    <td>${formatCurrency(subtotal)}</td>
                </tr>
                <tr>
                    <th className={th_style}>Shipping*</th>
                    <td>${subtotal > FREE_SHIPPING_THRESH?'Free':formatCurrency(SHIPPING_FEE)}</td>
                </tr>
                <tr>
                    <th className={th_style}>Total</th>
                    <td>${formatCurrency(total)}</td>
                </tr>
                <tr>
                    <th></th>
                    <td><p className='italic'>*Free shipping for orders over $100</p></td>
                </tr>
            </tbody>
                
        </table>
    )
}