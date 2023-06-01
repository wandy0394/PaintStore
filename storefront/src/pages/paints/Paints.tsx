import Catalog from "../../features/catalog/Catalog";
import LoadingComponent from "../../layouts/LoadingComponent";
import useProducts from "../../hooks/useProducts";

export default function Paints() {

    const {products, status, brands, productTypes, metaData} = useProducts()

    // if (isLoading) return <LoadingComponent message='Loading Paints...'/>
    if (status.includes("pending") || !metaData) return <LoadingComponent message='Loading Paints...'/>
    return (
        <Catalog 
            products={products} 
            brands={brands} 
            productTypes={productTypes}
            metaData={metaData}
        />
    )
}