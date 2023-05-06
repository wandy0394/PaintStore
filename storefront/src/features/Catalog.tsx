import { Product } from "../app/models/products"
import ProductList from "./ProductList"

type Props = {
    products:Product[]
}
export default function Catalog(props:Props) {
    const {products} = props

    return (
        <>
            <ProductList products={products}/>
        </>
    )
}