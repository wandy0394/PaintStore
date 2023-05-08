import { useState } from "react"
import { Product } from "../../models/products"

type Props = {
    products:Product[]
    filteredProducts:Product[]
    setFilteredProducts:React.Dispatch<React.SetStateAction<Product[]>>
}
export default function CatalogSideMenu(props:Props) {
    const {products, filteredProducts, setFilteredProducts} = props

    const [selectedBrands, setSelectedBrands] = useState<string[]>()
    const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>()


    
    function getBrands(products:Product[]):string[] {
        if (products === null || products === undefined) return []
        const brands = products.map((product)=>{
            return product.brand
        })
        const uniqueBrands:string[] = [...Array.from(new Set(brands))]
        return uniqueBrands
    }

    function getProductTypes(products:Product[]):string[] {
        if (products === null || products === undefined) return []
        const productTypes = products.map((product)=>{
            return product.productType
        })
        const uniqueProductTypes:string[] = [...Array.from(new Set(productTypes))]
        return uniqueProductTypes
    }

    function toggleBrandFilter(brand:string) {
        if (brand === undefined || brand === null) return
        if (selectedBrands.includes(brand)) {
            setSelectedBrands([...selectedBrands].filter(selected=>selected !== brand))
        }
        else {
            setSelectedBrands([...selectedBrands, brand])
        }
    }
    function toggleProductTypeFilter(productType:string) {
        if (productType === undefined || productType === null) return
        if (selectedBrands.includes(productType)) {
            setSelectedBrands([...selectedBrands].filter(selected=>selected !== productType))
        }
        else {
            setSelectedBrands([...selectedBrands, productType])
        }
    }

    function filterProducts() {
        //make api call to get filtered products
    }
    return (
        //Filters for brand, price, product type
        <div className='w-full h-full border border-red-300 p-8'>
            <div className='w-full flex flex-col items-center justify-center gap-8'>
                <div className='w-full flex flex-col items-start gap-2'>
                    <p className='text-sm'>Brands</p>
                    {
                        getBrands(products).map(brand=>{
                            return (
                                <div className='flex items-center gap-4'>
                                    <input 
                                        type="checkbox" 
                                        // checked={false} 
                                        className="checkbox" 
                                        onClick={()=>toggleBrandFilter(brand)}
                                    />
                                    {brand}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='w-full flex flex-col items-start gap-2'>
                    <p className='text-sm'>Type</p>
                    {
                        getProductTypes(products).map(type=>{
                            return (
                                <div className='flex items-center gap-4'>
                                    <input 
                                        type="checkbox" 
                                        className="checkbox"
                                        onClick={()=>toggleProductTypeFilter(type)}
                                    />
                                    {type}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}