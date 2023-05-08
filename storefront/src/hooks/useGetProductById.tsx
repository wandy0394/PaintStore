import { useEffect, useState } from "react";
import { Product } from "../models/products";

const URL = "http://localhost:5093/api/products"


export default function useGetProductById(id:string) : Product {
    const [product, setProduct] = useState<Product>()

    if (id === null || id === undefined) throw Error('Invalid input')
    useEffect(()=>{
        fetch(URL+`/${id}`)
            .then(response=>response.json())
            .then(data=>setProduct(data))
    }, [])

    return product
}
