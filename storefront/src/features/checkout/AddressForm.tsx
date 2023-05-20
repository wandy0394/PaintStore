export default function AddressForm() {

    return (

        <div className="w-full h-full flex flex-col gap-4">
            <h2 className='font-bold text-xl'>Shipping address</h2>
            <div className='w-full flex gap-4 items-center justify-center'>
                <input className='input w-full' placeholder="First name*"/>
                <input className='input w-full'  placeholder="Last name*"/>
            </div>
                <input className='input' placeholder="Address line 1*"/>
                <input className='input'  placeholder="Address line 2"/>
            <div className='w-full flex gap-4 items-center justify-center'>
                <input className='input w-full'  placeholder="City*"/>
                <input className='input w-full'  placeholder="State/Province/Region"/>
            </div>
            <div className='w-full flex gap-4 items-center justify-center'>
                <input className='input w-full'  placeholder="Zip / Postal code*"/>
                <input className='input w-full'  placeholder="Country*"/>
            </div>
            <div className='flex items-center gap-2'>
                <input className='input' type='checkbox'/>
                Use this address for payment details
            </div>
        </div>
    )
}