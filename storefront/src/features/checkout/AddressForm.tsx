import { useFormContext } from "react-hook-form"
import AppTextInput from "../../components/AppTextInput"
import AppCheckbox from "../../components/AppCheckbox"

export default function AddressForm() {
    const {control, formState} = useFormContext()
    return (

        <div className="w-full h-full flex flex-col gap-4">
            <h2 className='font-bold text-xl'>Shipping address</h2>
            <div className='w-full flex gap-4 items-center justify-center'>
                {/* <input className='input w-full' placeholder="First name*"/> */}
                <AppTextInput control={control} name='fullName' placeholder='Full Name*'/>
            </div>
            <AppTextInput control={control} name='address1' placeholder='Address 1*'/>
            <AppTextInput control={control} name='address2' placeholder='Address 2*'/>

                
            <div className='w-full flex gap-4 items-center justify-center'>
                <AppTextInput control={control} name='city' placeholder='City*'/>
            <AppTextInput control={control} name='state' placeholder='State/Province/Region'/>
                </div>
            <div className='w-full flex gap-4 items-center justify-center'>
                <AppTextInput control={control} name='zipcode' placeholder='Zip / Postal code*'/>
                <AppTextInput control={control} name='country' placeholder='Country*'/>

            </div>
            <AppCheckbox 
                disabled={!formState.isDirty}
                name='saveAddress' 
                label='Save this address as default'
            />
        </div>
    )
}