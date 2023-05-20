import './styles/cart-page-styles.css'
import CartSummary from "./CartSummary"
import { Link } from "react-router-dom"
import { useAppSelecter } from "../../app/store/configureStore"
import CartTable from "./CartTable"
export default function CartPage() {
    const {cart} = useAppSelecter(state=>state.cart)

    if (!cart || cart.items.length == 0) return <h1>Empty Cart</h1>
    return (
        <div className='w-full h-full py-8 px-24 flex flex-col gap-2 items-center justify-start'>
            <div className='w-full'>
                <h2 className='text-2xl'>Your Cart</h2>
            </div>
            <div className='flex flex-col items-end justify-center'>
                <div className="overflow-x-auto w-full h-full">
                    <CartTable items={cart.items}/>
                </div>
                <div>
                    <CartSummary/>
                </div>
                <Link to='/checkout'>
                    <button className='btn btn-primary'>Checkout</button>
                </Link>
            </div>
        </div>
    )
}