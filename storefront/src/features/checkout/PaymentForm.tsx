import { useFormContext } from "react-hook-form"
import AppTextInput from "../../components/AppTextInput"

export default function PaymentForm() {
    const {control} = useFormContext()
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <h2 className='font-bold text-xl'>Payment method</h2>

            <div className='w-full flex gap-4 items-center justify-center'>
                <AppTextInput placeholder="Name on card" name='nameOnCard' control={control}/>
                <input className='input w-full'  placeholder="Card number*"/>
            </div>
            <div className='w-full flex gap-4 items-center justify-center'>
                <input className='input w-full'  placeholder="Expiry date*"/>
                <input className='input w-full'  placeholder="CVV*"/>
            </div>
            <div className='flex items-center gap-2'>
                <input className='input' type='checkbox'/>
                Remember credit card details for next time
            </div>
        </div>
    )
}