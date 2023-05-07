import { useState } from "react"
import { Product } from "../../models/products"
import QuantityCounter from "./QuantityCounter"

type Props = {
    product:Product
}


export default function ProductCard(props:Props) {
    const {product} = props
    const [value, setValue] = useState<number>(1)

    return (
        <div key={product.id} className="card card-compact w-full bg-base-300 shadow-xl">
            {/* <div className='w-full'>{product.name}</div> */}
            <h2 className="card-title p-4 w-full h-24">{product.name}</h2>
            <figure><img src={product.imageUrl} alt="Product" /></figure>
            <div className="card-body">
                <p className='w-full text-center text-2xl'>{product.price}</p>
                <div className="card-actions justify-center">
                    <QuantityCounter value={value} setValue={setValue}/>
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>        
    )
}