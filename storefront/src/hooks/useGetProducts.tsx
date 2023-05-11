import { useEffect, useState } from "react";
import { Product } from "../models/products";
import {agent} from '../app/api/agent'

const URL = "http://localhost:5093/api/products"


export default function useGetProducts() : {products:Product[], isLoading:boolean} {
    const [products, setProducts] = useState<Product[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    // useEffect(()=>{
    //     fetch(URL)
    //         .then(response=>response.json())
    //         .then(data=>setProducts(data))
    // }, [])

    let called = false
    useEffect(()=>{
        if (!called) {
            agent.Catalog.list()
                .then(products => setProducts(products))
                .catch(error=>console.error(error))
                .finally(()=>setIsLoading(false))
        }
        return () => {
            called = true
        }
    }, [])
    return {products, isLoading}
}
