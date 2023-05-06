import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { Product } from "../app/models/products"
import ProductCard from "./ProductCard"

type Props = {
    products:Product[]
}
export default function ProductList(props:Props) {
    const {products} = props

    return (
        <List>
            {
                products &&
                    products.map((product,index)=>{
                        return (
                            <ProductCard key={product.id} product={product}/>
                        )
                    })
            }
        </List>
    )
}