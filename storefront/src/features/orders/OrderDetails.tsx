import { formatCurrency } from "../../app/util/util"
import { CartItem } from "../../models/cart"
import { Order } from "../../models/order"
import CartTable from "../Cart/CartTable"

type Props = {
    orderDetails: Order
    backToOrders: ()=>void
}
export default function OrderDetatils(props:Props) {
    const {orderDetails, backToOrders} = props
    
    return (
        <div className='w-fulll min-h-screen flex flex-col items-center gap-8'>
            <div className='w-full flex justify-between items-center'>
                <div className='text-2xl font-bold'>
                    Order# {orderDetails.id} - {orderDetails.orderStatus}
                </div>
                <div className='btn btn-primary' onClick={backToOrders}>BACK TO ORDERS</div>
            </div>
            <div>
                <CartTable items={orderDetails.orderItems as CartItem[]} isCart={false}/>
            </div>
            <div className='w-full flex flex-col'>
                <div className='w-full flex items-center justify-between'>
                    <div className='text-xl font-bold'>Subtotal</div>
                    <div className='text-xl font-bold'>${formatCurrency(orderDetails.subtotal)}</div>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <div className='text-xl font-bold'>Shipping Fee</div>
                    <div className='text-xl font-bold'>${formatCurrency(orderDetails.shippingFee)}</div>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <div className='text-xl font-bold'>Total</div>
                    <div className='text-xl font-bold'>${formatCurrency(orderDetails.total)}</div>
                </div>
            </div>
        </div>
    )
}