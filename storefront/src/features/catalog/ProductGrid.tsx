import { Product } from "../../models/products"
import ProductCard from "./ProductCard"

type Props = {
    products:Product[]
}
export default function ProductGrid(props:Props) {
    const {products} = props
    
    return (
        <div className='w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
                products &&
                    products.map((product, index)=>{
                        return <ProductCard key={'product'+index}product={product}/>
                    })
            }
        </div>
    )
}