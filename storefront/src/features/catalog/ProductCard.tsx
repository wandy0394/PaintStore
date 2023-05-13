import { useState } from "react"
import { Product } from "../../models/products"
import QuantityCounter from "./QuantityCounter"
import { Link } from "react-router-dom"
import ProductImage from "./ProductImage"
import LoadingButton from "../../components/LoadingButton"
import { formatCurrency } from "../../app/util/util"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { addCartItemAsync } from "../Cart/cartSlice"

type Props = {
    product:Product
}

const MIN_QTY = 0
export default function ProductCard(props:Props) {
    const {product} = props
    const [value, setValue] = useState<number>(1)

    const dispatch = useAppDispatch()
    const {status} = useAppSelecter(state=>state.cart)

    function handleDecrement() {
        const newValue:number = value - 1
        if (newValue >= MIN_QTY) setValue(newValue)
    }
    function handleIncrement() {
        const newValue:number = value + 1
        if (newValue <= product.quantityInStock) setValue(newValue)
    }


    return (
        <div key={product.id} className="card card-compact w-full bg-base-300 shadow-xl">
                <h2 className="card-title p-4 w-full h-24">{product.name}</h2>
                <Link to={`/catalog/${product.id}`}>
                    <ProductImage product={product}/>
                </Link>
                <div className="card-body">
                    <p className='w-full text-center text-2xl'>{`$${formatCurrency(product.price)}`}</p>
                    <div className="card-actions w-full justify-center grid grid-rows-2 place-items-center">
                        <QuantityCounter value={value} handleDecrement={handleDecrement} handleIncrement={handleIncrement}/>
                        <LoadingButton loading={status.includes('pendingAddItem'+product.id)}>
                            <button className="btn btn-primary w-full" onClick={()=>dispatch(addCartItemAsync({productId:product.id}))}>Add to cart</button>
                        </LoadingButton>
                    </div>
                </div>
        </div>        
    )
}