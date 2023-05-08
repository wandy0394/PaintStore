import { useParams } from "react-router-dom"
import useGetProductById from "../../hooks/useGetProductById"
import { Product } from "../../models/products"
import ProductImage from "./ProductImage"
import QuantityCounter from "./QuantityCounter"
import { useState } from "react"




export default function ProductDetails() {
    const {productId} = useParams<string>()
    const [value, setValue] = useState<number>(1)
    const product:Product = useGetProductById(productId)

    return (
        <div className='w-full h-full flex items-center justify-center px-32'>
            <div className='w-full h-full grid grid-rows-[2fr_1fr]'>
                {
                    product &&
                    <div className='w-full h-full grid md:grid-cols-2 gap-4'>
                            <div className='w-full flex items-center justify-center'>
                                <ProductImage product={product}/>
                            </div>
                            <div className='w-full h-full grid grid-rows-[1fr_1fr_2fr] px-4 gap-4'>
                                
                                <div className='w-full  flex flex-col items-start justify-center'>
                                    <div className='text-sm'>{product.brand}</div>
                                    <div className='text-2xl font-bold'>{product.name}</div>
                                    <div className='text-xl'>{`$${product.price / 100}`}</div>
                                </div>
                                <div className='flex flex-col items-start gap-4'>
                                    <p>{`We have ${product.quantityInStock} remaining in stock.`}</p>
                                    <QuantityCounter value={value} setValue={setValue}/>
                                    <div className='btn btn-primary'>Add to Cart</div>
                                </div>
                                <div className='w-full h-full'>
                                    {product.description}
                                </div>
                            </div>
                        </div>
                }
                <div className='w-full h-full'>
                    Reviews
                </div>
            </div>
        </div>
    )
}