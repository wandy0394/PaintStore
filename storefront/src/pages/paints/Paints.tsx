import { useEffect } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import Catalog from "../../features/catalog/Catalog";
import { fetchFilters, fetchProductsAsync, productsSelectors } from "../../features/catalog/catalogSlice";
import useGetProducts from "../../hooks/useGetProducts";
import LoadingComponent from "../../layouts/LoadingComponent";

export default function Paints() {
    // const {products, isLoading} = useGetProducts()
    const products = useAppSelecter(productsSelectors.selectAll)
    const {productsLoaded, filtersLoaded, status, brands, productTypes} = useAppSelecter(state=>state.catalog)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, filtersLoaded, dispatch])
    
    useEffect(()=>{
        if (!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])

    // if (isLoading) return <LoadingComponent message='Loading Paints...'/>
    if (status.includes("pending")) return <LoadingComponent message='Loading Paints...'/>
    return (
        <Catalog products={products} brands={brands} productTypes={productTypes}/>
    )
}