import { Product } from "../../models/products"
import ProductList from "./ProductList"
import CatalogSideMenu from "./CatalogSideMenu"
import { useState } from "react"
import ProductGrid from "./ProductGrid"

type Props = {
    products:Product[]
}
export default function Catalog(props:Props) {
    const {products} = props
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)


    return (
        <>
            <div className='w-full h-full grid grid-cols-[1fr_3fr] gap-8 px-8'>
                <CatalogSideMenu></CatalogSideMenu>
                {/* <ProductList products={filteredProducts}/> */}
                <ProductGrid products={products}/>
            </div>
        </>
    )
}