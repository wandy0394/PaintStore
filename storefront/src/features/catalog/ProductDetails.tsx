import { useParams } from "react-router-dom"
import useGetProductById from "../../hooks/useGetProductById"
import ProductImage from "./ProductImage"
import QuantityCounter from "./QuantityCounter"
import { useState, useEffect } from "react"
import NotFound from "../../app/errors/NotFound"
import LoadingComponent from "../../layouts/LoadingComponent"
import { useStoreContext } from "../../app/context/StoreContext"
import { CartItem } from "../../models/cart"
import { agent } from "../../app/api/agent"
import LoadingButton from "../../components/LoadingButton"




export default function ProductDetails() {
    const {cart, setCart, removeItem} = useStoreContext()
    const {productId} = useParams<string>()
    const [product, isLoading] = useGetProductById(productId)
    const [value, setValue] = useState<number>(1)
    const [quantity, setQuantity] = useState<number>(1)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [item, setItem] = useState<CartItem|null>(null)
    
    
    useEffect(()=>{
        if (cart) {
            const cartItem = cart?.items.find(item=>item.productId==Number(productId))
            if (cartItem) {
                setQuantity(cartItem.quantity)
                setItem(cartItem)
                console.log(cartItem)
            }
        }
    }, [cart, productId])
    
    function handleIncrement() {
        const newQuantity = quantity + 1
        if (newQuantity > product.quantityInStock) return
        setQuantity(newQuantity)
        // setValue(newQuantity)

    }
    function handleDecrement() {
        const newQuantity = quantity - 1
        if (newQuantity < 0) return
        setQuantity(newQuantity)
        // setValue(newQuantity)
    }

    function handleUpdateCart() {
        setSubmitting(true)
        if (item) {
            if (quantity > item.quantity) {
                const updateQuantity:number = quantity - item.quantity
                agent.Cart.addItem(product.id, updateQuantity)
                .then(cart=>setCart(cart))
                .catch(error=>console.log(error))
                .finally(()=>setSubmitting(false))
            }
            else if (quantity < item.quantity) {
                const updateQuantity:number = item.quantity-quantity
                agent.Cart.removeItem(product.id, updateQuantity)
                    .then(()=>{
                        removeItem(product.id, updateQuantity)
                    })
                    .catch(error=>console.log(error))
                    .finally(()=>setSubmitting(false))
            }
            else {
                setSubmitting(false)
            }
        }
        else {
            agent.Cart.addItem(product.id, quantity)
                .then(cart=>setCart(cart))
                .catch(error=>console.log(error))
                .finally(()=>setSubmitting(false))
        }
    }
    if (isLoading) return <LoadingComponent message='Loading product details...'/>


    return (
        <div className='w-full h-full flex items-center justify-center px-32'>
            <div className='w-full h-full grid grid-rows-[2fr_1fr]'>
                {
                    product &&
                    <div className='w-full h-full grid md:grid-cols-2 gap-4'>
                        <div className='w-full flex items-center justify-center'>
                            <ProductImage product={product}/>
                        </div>
                        <div className='w-full h-full grid grid-rows-[1fr_1fr_2fr] px-4 gap-4'>
                            
                            <div className='w-full  flex flex-col items-start justify-center'>
                                <div className='text-sm'>{product.brand}</div>
                                <div className='text-2xl font-bold'>{product.name}</div>
                                <div className='text-xl'>{`$${product.price / 100}`}</div>
                            </div>
                            <div className='flex flex-col md:items-start justify-center gap-4'>
                                <p>{`We have ${product.quantityInStock} remaining in stock.`}</p>
                                <div className='w-full flex justify-center md:justify-start'>
                                    <QuantityCounter value={quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>
                                </div>
                                
                                <div>Quantity in Cart: {item?item.quantity:0}</div>
                                <LoadingButton loading={submitting}>
                                    <button
                                        disabled={item?.quantity === quantity || !item && quantity === 0} 
                                        className='btn btn-primary w-full'
                                        onClick={handleUpdateCart}
                                        >
                                        {cart && item ? 'Update Cart':'Add to Cart'}
                                    </button>
                                </LoadingButton>
                            </div>
                            <div className='w-full h-full'>
                                {product.description}
                            </div>
                        </div>
                    </div>
                }
                {
                    !product && <NotFound/>
                }
                <div className='w-full h-full'>
                    Reviews
                </div>
            </div>
        </div>
    )
}