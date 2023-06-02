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
        // <div className='w-full h-full flex flex-col items-center justify-center px-16 py-24 gap-y-8'>
        //     <div className="w-3/4 flex items-center justify-between">
        //         <h1 className='text-2xl'>Inventory</h1>
        //         <button className='btn btn-primary'>Create</button>
        //     </div>

        //     <div className='w-3/4'>
        //         <div className='w-full overflow-x-auto'>
        //             <table className="w-full table">
        //                 <thead>
        //                 <tr>
        //                     <th>#</th>
        //                     <th></th>
        //                     <th>Product Name</th>
        //                     <th>Price</th>
        //                     <th>Type</th>
        //                     <th>Brand</th>
        //                     <th>Quantity in Stock</th>
        //                     <th></th>
        //                     <th></th>
        //                 </tr>
        //                 </thead>
        //                 <tbody>
        //                 {
        //                     products && products.map((item) => {
        //                         return (
        //                             <tr>
        //                                 <td>{item.id}</td>
        //                                 <td><img className='w-10 aspect-square' src={item.imageUrl}/></td>
        //                                 <td>{item.name}</td>
        //                                 <td>${formatCurrency(item.price)}</td>
        //                                 <td>{item.productType}</td>
        //                                 <td>{item.brand}</td>
        //                                 <td>{item.quantityInStock}</td>
        //                                 <td><button className='btn btn-primary btn-xs' onClick={()=>setEditMode(true)}>Edit</button></td>
        //                                 <td><button className='btn btn-error btn-xs'>Delete</button></td>
        //                             </tr>

        //                         )
        //                     })
        //                 }

        //                 </tbody>
        //             </table>
        //             {
        //                 metaData &&
        //                 <AppPagination 
        //                 metaData={metaData} 
        //                 onPageChange={(page:number)=>dispatch(setProductParams({pageNumber:page}))}
        //                 />
        //             }
        //         </div>

        //     </div>
        // </div>
    )
}