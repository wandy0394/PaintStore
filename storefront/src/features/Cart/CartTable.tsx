import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { formatCurrency } from "../../app/util/util"
import LoadingButton from "../../components/LoadingButton"
import { CartItem } from "../../models/cart"
import QuantityCounter from "../catalog/QuantityCounter"
import { removeCartItemAsync, addCartItemAsync } from "./cartSlice"

type Props = {
    items: CartItem[],
    isCart?: boolean
}

export default function CartTable(props:Props) {
    const {items, isCart=true} = props
    const dispatch = useAppDispatch()

    const {status} = useAppSelecter(state=>state.cart)

    return (
        <table className="table w-full h-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>-</th> 
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Sub-Total</th>
                    {
                        isCart&&
                        <th></th>
                    }
                </tr>
            </thead>
            <tbody>
            {
                items.map((item, index)=>{
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
                                {

                                    isCart ?
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
                                        : 
                                        <>
                                            {item.quantity}
                                        </>
                                }
                                
                            </td>
                            <td>${formatCurrency(item.price)}</td>
                            <td>${formatCurrency(item.price * item.quantity)}</td>
                                {/* Suggest changing this method of checking status */}
                            {
                                isCart&&
                                    <td>
                                        <LoadingButton loading={status === 'pendingRemoveItem'+item.productId+'del'}>
                                            <div className='btn btn-error btn-sm' onClick={()=>dispatch(removeCartItemAsync({productId:item.productId, quantity:item.quantity, tag:'del'}))}>DEL</div>
                                        </LoadingButton>
                                    </td>
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}