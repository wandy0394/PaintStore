import { Product } from "../../models/products"
import CatalogSideMenu from "./CatalogSideMenu"
import ProductGrid from "./ProductGrid"
import { MetaData } from "../../models/pagination"
import AppPagination from "../../app/components/AppPagination"
import { useAppDispatch } from "../../app/store/configureStore"
import { setProductParams } from "./catalogSlice"

type Props = {
    products:Product[],
    brands:string[],
    productTypes:string[],
    metaData:MetaData
}
export default function Catalog(props:Props) {
    const {products, brands, productTypes, metaData} = props
    const dispatch = useAppDispatch()

    return (
        <>
            <div className='w-full h-full grid grid-cols-[1fr_3fr] gap-8 px-8'>
                <CatalogSideMenu 
                    brands={brands}
                    productTypes={productTypes}
                />
                <div className='w-full h-full flex flex-col items-center gap-4'>
                    <ProductGrid products={products}/>
                    {
                        metaData &&
                            <AppPagination 
                                metaData={metaData} 
                                onPageChange={(page:number)=>dispatch(setProductParams({pageNumber:page}))}
                            />
                    }
                </div>
            </div>
        </>
    )
}