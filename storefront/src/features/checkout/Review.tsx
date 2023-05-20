import { useAppSelecter } from "../../app/store/configureStore";
import CartSummary from "../Cart/CartSummary";
import CartTable from "../Cart/CartTable";

export default function Review() {
    const {cart} = useAppSelecter(store => store.cart)
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h2 className='font-bold text-xl'>Order summary</h2>
            {
                cart &&
                    <div className='flex flex-col gap-2 '>
                        <CartTable items={cart.items} isCart={false} />
                        <CartSummary/>
                    </div>
            }
    
        </div>
    )
}