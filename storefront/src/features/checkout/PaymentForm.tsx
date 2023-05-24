import { useFormContext } from "react-hook-form"
import AppTextInput from "../../components/AppTextInput"
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js"
import { StripeElementType } from "@stripe/stripe-js"

  
type Props = {
    cardState: {elementError:{[key in StripeElementType]?:string}},
    onCardInputChange: (e:any) => void

}
// Pass the appearance object to the Elements instance
export default function PaymentForm(props:Props) {
    const {cardState, onCardInputChange} = props
    const {control} = useFormContext()


    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h2 className='font-bold text-xl'>Payment method</h2>

            <div className='w-full h-full flex gap-4 items-center justify-center'>
                <AppTextInput placeholder="Name on card" name='nameOnCard' control={control}/>
                <div className='w-full flex-col flex gap-2'>
                    <CardNumberElement 
                        className={`input w-full border border-solid rounded ${!!cardState.elementError.cardNumber && `bg-red-200`}`} 
                        onChange={onCardInputChange}
                    />
                    <p className='text-red-700'>{cardState.elementError.cardNumber}</p>
                </div>  
            </div>
            <div className='w-full flex flex-col gap-4 items-center justify-center'>
                <div className='w-full flex gap-2 items-center justify-between'>
                    <CardExpiryElement 
                        className={`input w-full border border-solid rounded ${!!cardState.elementError.cardExpiry && `bg-red-200`}`} 
                        onChange={onCardInputChange}
                    />
                    <CardCvcElement 
                        className={`input w-full border border-solid rounded ${!!cardState.elementError.cardCvc && `bg-red-200`}`} 
                        onChange={onCardInputChange}
                    />
                </div>
                <div className='w-full flex gap-2 items-center'>
                    <p className='text-red-700 w-full'>{cardState.elementError.cardExpiry}</p>
                    <p className='text-red-700 w-full'>{cardState.elementError.cardCvc}</p>
                </div>                
            </div>
        </div>
    )
}