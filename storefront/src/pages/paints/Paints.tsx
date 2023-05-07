import Catalog from "../../features/catalog/Catalog";
import useGetProducts from "../../hooks/useGetProducts";

export default function Paints() {
    const [products] = useGetProducts()
    return (
        <Catalog products={products}/>
    )
}