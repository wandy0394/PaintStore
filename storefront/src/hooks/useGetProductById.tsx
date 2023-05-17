import { useEffect, useState } from "react";
import { Product } from "../models/products";
import axios from 'axios'
import {agent} from '../app/api/agent'

const URL = "http://localhost:5094/api/products"


export default function useGetProductById(id:string) : [Product, boolean] {
    const [product, setProduct] = useState<Product>()

    const [loading, setLoading] = useState<boolean>(true)

    if (id === null || id === undefined) throw Error('Invalid input')

    let called = false
    useEffect(()=>{
        if (!called) {

            agent.Catalog.details(id)
            .then(response=>setProduct(response))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
        }

        return () => {
            called = true
        }
    }, [id])

    return [product, loading]
}
