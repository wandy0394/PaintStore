import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { Product } from "../app/models/products"

type Props = {
    product:Product
}
export default function ProductCard(props:Props) {
    const {product} = props
    return (
        <div>
            <ListItem key={product.id}>
                <ListItemAvatar>
                    <Avatar src={product.imageUrl}/>
                </ListItemAvatar>
                <ListItemText>
                    {product.name} - {product.price}
                </ListItemText>
                {/* <ProductCard product={product}/> */}
            </ListItem>
        </div>
    )
}