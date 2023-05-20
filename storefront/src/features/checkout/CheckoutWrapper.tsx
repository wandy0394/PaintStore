import {Elements} from "@stripe/react-stripe-js"
import CheckoutPage from "./CheckoutPage"
import { loadStripe } from "@stripe/stripe-js"
import { useAppDispatch } from "../../app/store/configureStore"
import { useEffect, useState } from "react"
import { agent } from "../../app/api/agent"
import { setCart } from "../Cart/cartSlice"
import LoadingComponent from "../../layouts/LoadingComponent"

const stripePromie = loadStripe('pk_test_51N9jBTEgwP7DDn6pyyc94aqfKHmxOhZWMc0IUJKa3Fx7M3VGkGbFJNJ1ixINNrPNcSZWK2IrZ8mT4eEDry1UGj6B00ispF68Ez')
export default function CheckoutWrapper() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        agent.Payments.createPaymentIntent()
            .then(cart => dispatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false))
    }, [dispatch])

    if (loading) return <LoadingComponent message="Loading checkout"/>
    return (
        <Elements stripe={stripePromie}>
            <CheckoutPage/>
        </Elements>
    )
}