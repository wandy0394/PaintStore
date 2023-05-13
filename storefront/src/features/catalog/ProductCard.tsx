import { useState } from "react"
import { Product } from "../../models/products"
import QuantityCounter from "./QuantityCounter"
import { Link } from "react-router-dom"
import ProductImage from "./ProductImage"
import { agent } from "../../app/api/agent"
import LoadingButton from "../../components/LoadingButton"
import { useStoreContext } from "../../app/context/StoreContext"
import { formatCurrency } from "../../app/util/util"

type Props = {
    product:Product
}

const MIN_QTY = 0
export default function ProductCard(props:Props) {
    const {product} = props
    const [value, setValue] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const {setCart} = useStoreContext()
    
    function handleAddItem(productId:number) {
        setLoading(true);
        agent.Cart.addItem(productId, value)
            .then(cart=>setCart(cart))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    }
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
                {/* <figure><img src={product.imageUrl} alt="Product" /></figure> */}
                <Link to={`/catalog/${product.id}`}>
                    <ProductImage product={product}/>
                </Link>
                <div className="card-body">
                    <p className='w-full text-center text-2xl'>{`$${formatCurrency(product.price)}`}</p>
                    <div className="card-actions w-full justify-center grid grid-rows-2 place-items-center">
                        <QuantityCounter value={value} handleDecrement={handleDecrement} handleIncrement={handleIncrement}/>
                        <LoadingButton loading={loading}>
                            <button className="btn btn-primary w-full" onClick={()=>handleAddItem(product.id)}>Add to cart</button>
                        </LoadingButton>
                    </div>
                </div>
        </div>        
    )
}