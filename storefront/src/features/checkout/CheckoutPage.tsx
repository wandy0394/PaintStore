import { useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import AddressForm from "./AddressForm";
import Review from "./Review";
import PaymentForm from "./PaymentForm";

const MAX_STEPS = 3
const MIN_STEP = 1
export default function CheckoutPage() {
    const [step, setStep] = useState<number>(1)
    function handleBackClick(): void {
        if (step > MIN_STEP) setStep(p=>p-1)
    }

    function handleNextClick(): void {
        if (step < MAX_STEPS) setStep(p=>p+1)
    }

    function handleOrderClick(): void {
    }

    return (
        <div className='w-full min-h-screen'>
            <div className='w-full min-h-screen flex items-center justify-center border border-blue-500 p-16'>
                <div className='w-2/3 bg-base-200 flex flex-col gap-4 items-center justify-center p-4 rounded'>
                    <h1 className='font-bold text-2xl'>Checkout</h1>
                    <CheckoutSteps currentStep={step}/>
                    {
                        (step == 1) &&
                            <AddressForm/>
                    }
                    {
                        (step == 2) &&
                            <Review/>
                    }
                    {
                        (step == 3) &&
                            <PaymentForm/>
                    }
                    <div className='w-full flex items-center justify-end gap-4'>
                        <button disabled={step <= MIN_STEP} className='btn btn-secondary' onClick={handleBackClick}>Back</button>
                        {
                            (step < 3) &&
                                <button className='btn btn-primary'onClick={handleNextClick}>Next</button>
                        }
                        {
                            (step == 3) &&
                            <button className='btn btn-primary'onClick={handleOrderClick}>PLACE ORDER</button>
                        }                        
                    </div>
                </div>
            </div>
        </div>
    )
}