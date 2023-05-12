import { useState } from "react"
import { Product } from "../../models/products"
import QuantityCounter from "./QuantityCounter"
import { Link } from "react-router-dom"
import ProductImage from "./ProductImage"
import { agent } from "../../app/api/agent"
import LoadingButton from "../../components/LoadingButton"

type Props = {
    product:Product
}


export default function ProductCard(props:Props) {
    const {product} = props
    const [value, setValue] = useState<number>(1)


    const [loading, setLoading] = useState<boolean>(false)
    
    function handleAddItem(productId:number) {
        setLoading(true);
        agent.Cart.addItem(productId, value)
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    }

    return (
        <div key={product.id} className="card card-compact w-full bg-base-300 shadow-xl">
                <h2 className="card-title p-4 w-full h-24">{product.name}</h2>
                {/* <figure><img src={product.imageUrl} alt="Product" /></figure> */}
                <Link to={`/catalog/${product.id}`}>
                    <ProductImage product={product}/>
                </Link>
                <div className="card-body">
                    <p className='w-full text-center text-2xl'>{`$${product.price/100}`}</p>
                    <div className="card-actions justify-center grid grid-rows-2 place-items-center">
                        <QuantityCounter value={value} setValue={setValue}/>
                        <LoadingButton loading={loading}>
                            <button className="btn btn-primary" onClick={()=>handleAddItem(product.id)}>Add to cart</button>
                        </LoadingButton>
                    </div>
                </div>
        </div>        
    )
}