import { Product } from "../../models/products"
import CatalogSideMenu from "./CatalogSideMenu"
import { useEffect, useState } from "react"
import ProductGrid from "./ProductGrid"

type Props = {
    products:Product[],
    brands:string[],
    productTypes:string[]
}
export default function Catalog(props:Props) {
    const {products, brands, productTypes} = props
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

    useEffect(()=>{
        setFilteredProducts(products)
    }, [products])

    return (
        <>
            <div className='w-full h-full grid grid-cols-[1fr_3fr] gap-8 px-8'>
                <CatalogSideMenu 
                    brands={brands}
                    productTypes={productTypes}
                />
                {/* <ProductList products={filteredProducts}/> */}
                <div className='w-full h-full flex flex-col items-center gap-4'>
                    <ProductGrid products={filteredProducts}/>
                    <div className="btn-group">
                        <button className="btn">1</button>
                        <button className="btn btn-active">2</button>
                        <button className="btn">3</button>
                        <button className="btn">4</button>
                    </div>
                </div>
            </div>
        </>
    )
}