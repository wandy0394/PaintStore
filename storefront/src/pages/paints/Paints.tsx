import Catalog from "../../features/catalog/Catalog";
import useGetProducts from "../../hooks/useGetProducts";
import LoadingComponent from "../../layouts/LoadingComponent";

export default function Paints() {
    const {products, isLoading} = useGetProducts()
    if (isLoading) return <LoadingComponent message='Loading Paints...'/>
    return (
        <Catalog products={products}/>
    )
}