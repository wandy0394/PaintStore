import { Product } from "../../models/products"
import ProductCard from "./ProductCard"

type Props = {
    products:Product[]
}
export default function ProductList(props:Props) {
    const {products} = props

    return (
        <li>
            {
                products &&
                    products.map((product)=>{
                        return (
                            <ProductCard key={product.id} product={product}/>
                        )
                    })
            }
        </li>
    )
}