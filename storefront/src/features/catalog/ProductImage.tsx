import { Product } from "../../models/products"

type Props = {
    product:Product
}
export default function ProductImage(props:Props) {
    const {product} = props
    return (
        <figure>
            {
                product &&
                    <img src={product.imageUrl} />
            }
        </figure>
    )
}