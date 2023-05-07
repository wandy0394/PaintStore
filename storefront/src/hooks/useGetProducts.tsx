import { useEffect, useState } from "react";
import { Product } from "../models/products";

const URL = "http://localhost:5093/api/products"


export default function useGetProducts() : [Product[]] {
    const [products, setProducts] = useState<Product[]>()

    useEffect(()=>{
        fetch(URL)
            .then(response=>response.json())
            .then(data=>setProducts(data))
    }, [])

    return [products]
}
