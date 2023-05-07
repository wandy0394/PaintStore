import { Product } from "../../models/products"
import ProductCard from "./ProductCard"

type Props = {
    products:Product[]
}
export default function ProductGrid(props:Props) {
    const {products} = props
    
    return (
        <div className='w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {/* <div className='w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'> */}
            {
                products &&
                    products.map(product=>{
                        return <ProductCard product={product}/>
                    })
            }
        </div>
    )
}