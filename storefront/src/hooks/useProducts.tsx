import { useEffect } from "react";
import { useAppSelecter, useAppDispatch } from "../app/store/configureStore";
import { productsSelectors, fetchProductsAsync, fetchFilters } from "../features/catalog/catalogSlice";

export default function useProducts() {
    const products = useAppSelecter(productsSelectors.selectAll)
    const {productsLoaded, filtersLoaded, status, brands, productTypes, metaData} = useAppSelecter(state=>state.catalog)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, filtersLoaded, dispatch])
    
    useEffect(()=>{
        if (!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])

    return {
        products, 
        productsLoaded, 
        filtersLoaded, 
        status, 
        brands, 
        productTypes, 
        metaData
    }
}