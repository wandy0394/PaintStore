import { useParams } from "react-router-dom"
import ProductImage from "./ProductImage"
import QuantityCounter from "./QuantityCounter"
import { useState, useEffect } from "react"
import NotFound from "../../app/errors/NotFound"
import LoadingComponent from "../../layouts/LoadingComponent"
import { CartItem } from "../../models/cart"
import LoadingButton from "../../components/LoadingButton"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { addCartItemAsync, removeCartItemAsync } from "../Cart/cartSlice"
import { fetchProductByIdAsync, productsSelectors } from "./catalogSlice"




export default function ProductDetails() {
    const {cart, status} = useAppSelecter(state=>state.cart)
    const dispatch = useAppDispatch()
    const {productId} = useParams<string>()
    const product = useAppSelecter(state => productsSelectors.selectById(state, productId))
    const {status: productStatus} = useAppSelecter(state => state.catalog)
    const [quantity, setQuantity] = useState<number>(1)
    const [item, setItem] = useState<CartItem|null>(null)
    
    //fetch product details from api to catch case where page is reloaded
    useEffect(()=>{
        if (!product) dispatch(fetchProductByIdAsync(productId))
    }, [productId, product, dispatch])

    useEffect(()=>{
        if (cart) {
            const cartItem = cart?.items?.find(item=>item.productId===Number(productId))
            if (cartItem) {
                setQuantity(cartItem.quantity)
            }
            setItem(cartItem)
        }
    }, [cart, productId])
    
    function handleIncrement() {
        const newQuantity = quantity + 1
        if (newQuantity > product.quantityInStock) return
        setQuantity(newQuantity)
    }
    function handleDecrement() {
        const newQuantity = quantity - 1
        if (newQuantity < 0) return
        setQuantity(newQuantity)
    }

    function handleUpdateCart() {
        if (item) {
            if (quantity > item.quantity) {
                const updateQuantity:number = quantity - item.quantity
                dispatch(addCartItemAsync({productId:product.id, quantity:updateQuantity}))
            }
            else if (quantity < item.quantity) {
                const updateQuantity:number = item.quantity-quantity
                dispatch(removeCartItemAsync({productId:product.id, quantity:updateQuantity}))
            }
        }
        else {
            dispatch(addCartItemAsync({productId:product.id, quantity:quantity}))
        }
    }
    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product details...'/>
    // if (isLoading) return <LoadingComponent message='Loading product details...'/>


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
                                <div>Quantity in Cart: {item?item.quantity:0}</div>
                                <div className='w-full flex justify-center md:justify-start'>
                                    <QuantityCounter value={quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>
                                </div>
                                <LoadingButton 
                                    loading={status === ("pendingAddItem"+productId) ||
                                        status === ("pendingRemoveItem"+productId)
                                    }
                                >
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