import { useRef, useState } from "react"
import AppPagination from "../../app/components/AppPagination"
import { useAppDispatch } from "../../app/store/configureStore"
import { formatCurrency } from "../../app/util/util"
import useProducts from "../../hooks/useProducts"
import LoadingComponent from "../../layouts/LoadingComponent"
import { setProductParams } from "../catalog/catalogSlice"
import ProductForm from "./ProductForm"
import InventorySummary from "./InventorySummary"
import { Product } from "../../models/products"

export default function Inventory() {
    const {products, brands, productTypes, metaData, productsLoaded} = useProducts()
    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState<boolean>(false)
    const [item, setItem] = useState<Product | null>(null)

    if (!productsLoaded) return <LoadingComponent message='Loading Products...'/>
    function changeEditMode(visible:boolean, item?:Product) {
        setEditMode(visible)
        if (item) {
            setItem(item)
        }
        else {
            setItem(null)
        }
    }
    return (
        <div className='w-full h-full flex flex-col items-center justify-center px-16 py-24 gap-y-8'>
            {
                editMode 
                    ? <ProductForm item={item} brands={brands} productTypes={productTypes} setEditMode={changeEditMode}/>
                    : <InventorySummary products={products} metaData={metaData} setEditMode={changeEditMode}/>
            }
        </div>

    )
}