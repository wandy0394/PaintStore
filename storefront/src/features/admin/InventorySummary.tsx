import { useState } from "react"
import AppPagination from "../../app/components/AppPagination"
import { useAppDispatch } from "../../app/store/configureStore"
import { formatCurrency } from "../../app/util/util"
import { Product } from "../../models/products"
import { removeProduct, setProductParams } from "../catalog/catalogSlice"
import { agent } from "../../app/api/agent"
import LoadingButton from "../../components/LoadingButton"

type Props = {
    products:any
    metaData:any
    setEditMode: (visible:boolean, item?:Product)=>void
}

export default function InventorySummary(props:Props) {
    const {products, metaData, setEditMode} = props
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [target, setTarget] = useState(0)


    function handleDeleteProduct(id:number) {
        setLoading(true)
        setTarget(id)
        agent.Admin.deleteProduct(id)
            .then(()=>dispatch(removeProduct(id)))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false))
    }

    return (    
        <div className='w-full h-full flex flex-col items-center justify-center gap-y-8'>
            <div className="w-3/4 flex items-center justify-between">
                <h1 className='text-2xl'>Inventory</h1>
                <button className='btn btn-primary' onClick={()=>setEditMode(true)}>Create</button>
            </div>

            <div className='w-3/4'>
                <div className='w-full overflow-x-auto'>
                    <table className="w-full table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Quantity in Stock</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products && products.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td><img className='w-10 aspect-square' src={item.imageUrl}/></td>
                                        <td>{item.name}</td>
                                        <td>${formatCurrency(item.price)}</td>
                                        <td>{item.productType}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.quantityInStock}</td>
                                        <td><button className='btn btn-primary btn-xs' onClick={()=>setEditMode(true, item)}>Edit</button></td>
                                        <td>
                                            <LoadingButton loading={loading && target === item.id}>
                                                <button className='btn btn-error btn-xs' onClick={()=>handleDeleteProduct(item.id)}>Delete</button>
                                            </LoadingButton>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                    </table>
                    {
                        metaData &&
                        <AppPagination 
                        metaData={metaData} 
                        onPageChange={(page:number)=>dispatch(setProductParams({pageNumber:page}))}
                        />
                    }
                </div>

            </div>
        </div>
    )
}