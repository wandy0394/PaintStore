import ProductSearch from "./ProductSearch"
import RadioButtonGroup from "../../app/components/RadioButtonGroup"
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore"
import { setProductParams } from "./catalogSlice"
import CheckboxGroup from "../../app/components/CheckboxGroup"

type Props = {
    brands:string[]
    productTypes:string[]
}

const sortOptions = [
    {value:'name', label:'A-Z'},
    // {value:'nameReversed', label:'Z-A'},
    {value:'priceDesc', label:'Price - High to Low'},
    {value:'price', label:'Price - Low to High'},
]
export default function CatalogSideMenu(props:Props) {
    const {brands, productTypes} = props
    const dispatch = useAppDispatch()
    const {productParams} = useAppSelecter(state=>state.catalog)


    return (
        //Filters for brand, price, product type
        <div className='w-full h-full'>
            <div className='w-full flex flex-col items-center justify-center gap-8'>
                <ProductSearch/>
                <RadioButtonGroup 
                    options={sortOptions}
                    onChange={(e)=>{
                        dispatch(setProductParams({orderBy:e.target.value, pageNumber:1}))
                    }}
                    selectedValue={productParams.orderBy}
                />
                <CheckboxGroup 
                    title='Brands' 
                    items={brands} 
                    checked={productParams.brands}
                    onChange={(brands)=>dispatch(setProductParams({brands:brands, pageNumber:1}))}
                />
                <CheckboxGroup 
                    title='Product Type' 
                    items={productTypes} 
                    checked={productParams.productTypes}
                    onChange={(productTypes)=>dispatch(setProductParams({productTypes:productTypes, pageNumber:1}))}
                />
            </div>
        </div>
    )
}