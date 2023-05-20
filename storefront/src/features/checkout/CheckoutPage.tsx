import { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import AddressForm from "./AddressForm";
import Review from "./Review";
import PaymentForm from "./PaymentForm";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import { validationSchema } from "./checkoutValidation";
import { agent } from "../../app/api/agent";
import { useDispatch } from "react-redux";
import { clearCart } from "../Cart/cartSlice";
import LoadingButton from "../../components/LoadingButton";

const MAX_STEPS = 3
const MIN_STEP = 1

function OrderComplete({orderNumber}) {
    return (
        <div className='w-full flex flex-col gap-4'>
            <h2 className='text-xl font-bold'>Your order has been placed.</h2>
            <p className=''>Your order number is #{orderNumber}. A confirmation email will not be sent to you shortly.</p>
        </div>
    )
}


export default function CheckoutPage() {
    const [step, setStep] = useState<number>(1)
    const [orderNumber, setOrderNumber] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()


    const currentValidationSchema = validationSchema[step-1]
    const methods = useForm({
        mode:'onTouched',
        resolver:yupResolver(currentValidationSchema)
    })
    useEffect(()=>{
        agent.Account.getAddress()
            .then(response => {
                if (response) {
                    methods.reset({...methods.getValues(), ...response, saveAddress:false})
                }
            })
    }, [methods])
    function handleBackClick(): void {
        if (step > MIN_STEP) setStep(p=>p-1)
    }

    function handleNextClick(): void {
        if (step < MAX_STEPS) setStep(p=>p+1)
    }

    async function handleOrderClick(data:FieldValues) {
        //temporary measure to show order success
        const {nameOnCard, saveAddress, ...shippingAddress} = data
        setLoading(true)
        try {
            const orderNumber = await agent.Orders.create({saveAddress, shippingAddress})
            setOrderNumber(orderNumber)
            setStep(MAX_STEPS+1)
            dispatch(clearCart())
            setLoading(false);
        }
        catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    function getFormByStep() {
        switch (step) {
            case 1:
                return <AddressForm/>
                break;
            case 2:
                return <Review/>
                break;
            case 3:
                return <PaymentForm/>
                break;
            case 4:
                return <OrderComplete orderNumber={orderNumber}/>
            default:
                return <h1>Error</h1>
        }
    }

    return (
        <FormProvider {...methods}>

            <div className='w-full min-h-screen'>
                <div className='w-full min-h-screen flex items-start justify-center py-24 px-16'>
                    <div className='w-2/3 bg-base-200 flex flex-col gap-4 items-center justify-center p-8 rounded'>
                        <h1 className='font-bold text-2xl'>Checkout</h1>
                        <CheckoutSteps currentStep={step}/>
                        <form 
                            className ='w-full flex flex-col gap-4 items-center justify-center' 
                            onSubmit={methods.handleSubmit(handleOrderClick)}
                        >
                            {
                                getFormByStep()
                            }
                            <div className='w-full flex items-center justify-end gap-4'>
                                {
                                    (step < MAX_STEPS) &&
                                    <div className={`btn btn-secondary ${(step <= MIN_STEP) && 'btn-disabled'}`} onClick={handleBackClick}>Back</div>
                                }
                                {
                                    (step < MAX_STEPS) &&
                                        <button 
                                            type='button' 
                                            disabled={!methods.formState.isValid} 
                                            className='btn btn-primary' 
                                            onClick={handleNextClick}
                                        >
                                            Next
                                        </button>
                                }
                                {
                                    (step === MAX_STEPS) &&
                                    <LoadingButton loading={loading}>
                                        <button 
                                            disabled={!methods.formState.isValid} 
                                            type='submit' 
                                            className='btn btn-primary' 
                                            >
                                            PLACE ORDER
                                        </button>
                                    </LoadingButton>
                                }                        
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </FormProvider>
    )
}