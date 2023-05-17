import { useState } from "react"
import { Product } from "../../models/products"

type Props = {
    brands:string[]
    productTypes:string[]
}

const sortOptions = [
    {value:'name', label:'A-Z'},
    {value:'nameReversed', label:'Z-A'},
    {value:'priceDesc', label:'Price - High to Low'},
    {value:'price', label:'Price - Low to High'},
]
export default function CatalogSideMenu(props:Props) {
    const {brands, productTypes} = props

    const [selectedBrands, setSelectedBrands] = useState<string[]>()
    const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>()
    const [searchTerm, setSearchTerm] = useState<string>('')


    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value)
    }

    function filterProducts() {
        //make api call to get filtered products
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
        if (selectedProductTypes.includes(productType)) {
            setSelectedProductTypes([...selectedProductTypes].filter(selected=>selected !== productType))
        }
        else {
            setSelectedProductTypes([...selectedProductTypes, productType])
        }
    }

    return (
        //Filters for brand, price, product type
        <div className='w-full h-full'>
            <div className='w-full flex flex-col items-center justify-center gap-8'>
                <div className='form-control w-full'>
                    <label className="label">
                        <span className="label-text">Search products</span>
                    </label>
                    <input 
                        className='input input-bordered w-full' 
                        placeholder='Search...'
                        value={searchTerm}
                        onChange={(e)=>handleSearchTermChange(e)}
                    />
                </div>
                <ul className='form-control w-full flex flex-col items-start gap-2 menu bg-base-300 rounded p-4'>
                    {
                        sortOptions.map((option, index)=>{
                            return (
                                <div key={'brand-'+index} className='flex items-center gap-4'>
                                    <input 
                                        type="radio" 
                                        name="radio-1"
                                        // checked={false} 
                                        className="radio checked:bg-teal-500" 
                                    />
                                    {option.label}
                                </div>
                            )
                        })
                    }
                </ul>
                <ul className='w-full flex flex-col items-start gap-2 menu bg-base-300 rounded p-4'>
                    <li className='menu-title'>
                        <span>Brands</span>
                    </li>
                    {
                        brands.map((brand, index)=>{
                            return (
                                <div key={'brand-'+index} className='flex items-center gap-4'>
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
                </ul>
                <ul className='w-full flex flex-col items-start gap-2 menu bg-base-300 rounded p-4'>
                    <li className='menu-title'>
                        <span>Product Type</span>
                    </li>
                    {
                        productTypes.map((type, index)=>{
                            return (
                                <div key={'type-'+index} className='flex items-center gap-4'>
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
                </ul>
            </div>
        </div>
    )
}