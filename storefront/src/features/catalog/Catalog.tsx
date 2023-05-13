import { Product } from "../../models/products"
import CatalogSideMenu from "./CatalogSideMenu"
import { useEffect, useState } from "react"
import ProductGrid from "./ProductGrid"

type Props = {
    products:Product[]
}
export default function Catalog(props:Props) {
    const {products} = props
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

    useEffect(()=>{
        setFilteredProducts(products)
    }, [products])

    return (
        <>
            <div className='w-full h-full grid grid-cols-[1fr_3fr] gap-8 px-8'>
                <CatalogSideMenu 
                    products={products} 
                    filteredProducts={filteredProducts} 
                    setFilteredProducts={setFilteredProducts}
                />
                {/* <ProductList products={filteredProducts}/> */}
                <ProductGrid products={filteredProducts}/>
            </div>
        </>
    )
}