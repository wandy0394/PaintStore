import { useEffect, useState } from "react"
import { agent } from "../../app/api/agent"
import QuantityCounter from "../catalog/QuantityCounter"
import './styles/cart-page-styles.css'
import { useStoreContext } from "../../app/context/StoreContext"
import LoadingButton from "../../components/LoadingButton"
import CartSummary from "./CartSummary"
import { formatCurrency } from "../../app/util/util"
export default function CartPage() {
    const {cart, setCart, removeItem} = useStoreContext()
    const [status, setStatus] = useState({
        loading:false,
        tag:''
    })

    function removeItemFromCart(productId:number, quantity:number=1, tag:string='') {
        setStatus({
            loading:true,
            tag
        })
        agent.Cart.removeItem(productId, quantity)
            .then(()=>{
                removeItem(productId, quantity)
            })
            .catch(error=>console.log(error))
            .finally(()=>{
                setStatus({
                    ...status,
                    loading:false
                })
            })
    }

    function handleAddItem(productId:number, tag:string) {
        setStatus({
            loading:true,
            tag
        })
        agent.Cart.addItem(productId)
            .then(cart=>setCart(cart))
            .catch(error=>console.log(error))
            .finally(()=>{
                setStatus({
                    ...status,
                    loading:false
                })
            })
    }

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
                                            <LoadingButton loading={status.loading && status.tag == 'qty-'+item.productId}>
                                                <QuantityCounter 
                                                    value={item.quantity} 
                                                    handleDecrement={()=>removeItemFromCart(item.productId, 1, ('qty-'+item.productId))}
                                                    handleIncrement={()=>handleAddItem(item.productId, 'qty-'+item.productId)}
                                                />
                                            </LoadingButton>
                                        </td>
                                        <td>${formatCurrency(item.price)}</td>
                                        <td>${formatCurrency(item.price * item.quantity)}</td>
                                        <td>
                                            <LoadingButton loading={status.loading && status.tag == 'del-'+item.productId}>
                                                <div className='btn btn-error btn-sm' onClick={()=>removeItemFromCart(item.productId, item.quantity, 'del-'+item.productId)}>DEL</div>
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
            </div>
        </div>
    )
}