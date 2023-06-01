import AppPagination from "../../app/components/AppPagination"
import { useAppDispatch } from "../../app/store/configureStore"
import { formatCurrency } from "../../app/util/util"
import useProducts from "../../hooks/useProducts"
import { setProductParams } from "../catalog/catalogSlice"

export default function Inventory() {
    const {products, metaData} = useProducts()
    const dispatch = useAppDispatch()

    return (
        <div className='w-full h-full flex flex-col items-center justify-center px-16 py-24 gap-y-8'>
            <div className="w-full flex items-center justify-between">
                <h1 className='text-2xl'>Inventory</h1>
                <button className='btn btn-primary'>Create</button>
            </div>

                <table className="table">
                    {/* head */}
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
                        products && products.map((item) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td><img className='h-10 aspect-square' src={item.imageUrl}/></td>
                                    <td>{item.name}</td>
                                    <td>${formatCurrency(item.price)}</td>
                                    <td>{item.productType}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.quantityInStock}</td>
                                    <td><button className='btn btn-primary btn-xs'>Edit</button></td>
                                    <td><button className='btn btn-error btn-xs'>Delete</button></td>
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
    )
}