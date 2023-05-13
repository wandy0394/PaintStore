import QuantityCounter from "../catalog/QuantityCounter"
import './styles/cart-page-styles.css'
import LoadingButton from "../../components/LoadingButton"
import CartSummary from "./CartSummary"
import { formatCurrency } from "../../app/util/util"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { addCartItemAsync, removeCartItemAsync } from "./cartSlice"
export default function CartPage() {
    const dispatch = useAppDispatch()
    const {cart, status} = useAppSelecter(state=>state.cart)

    if (!cart || cart.items.length == 0) return <h1>Empty Cart</h1>
    return (
        <div className='w-full h-full py-8 px-24 flex flex-col gap-2 items-center justify-start'>
            <div className='w-full'>
                <h2 className='text-2xl'>Your Cart</h2>
            </div>
            <div className='flex flex-col items-end justify-center'>
                <div className="overflow-x-auto w-full h-full">
                    <table className="table w-full h-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>-</th> 
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
                                    <tr key={'row'+index}>
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
                                            {/* <LoadingButton loading={status.loading && status.tag == 'qty-'+item.productId}>
                                             */}
                                            <LoadingButton 
                                                loading={
                                                    status === ('pendingRemoveItem'+item.productId) || 
                                                        status === ('pendingAddItem'+item.productId)}
                                            >

                                                <QuantityCounter 
                                                    value={item.quantity} 
                                                    handleDecrement={()=>dispatch(removeCartItemAsync({productId:item.productId, quantity:1}))}
                                                    handleIncrement={()=>dispatch(addCartItemAsync({productId:item.productId}))}
                                                />
                                            </LoadingButton>
                                        </td>
                                        <td>${formatCurrency(item.price)}</td>
                                        <td>${formatCurrency(item.price * item.quantity)}</td>
                                        <td>
                                            {/* Suggest changing this method of checking status */}
                                            <LoadingButton loading={status === 'pendingRemoveItem'+item.productId+'del'}>
                                                <div className='btn btn-error btn-sm' onClick={()=>dispatch(removeCartItemAsync({productId:item.productId, quantity:item.quantity, tag:'del'}))}>DEL</div>
                                            </LoadingButton>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div>
                    <CartSummary/>
                </div>
                <Link to='/checkout'>
                    <button className='btn btn-primary'>Checkout</button>
                </Link>
            </div>
        </div>
    )
}