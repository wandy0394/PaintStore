import {UseControllerProps, useController} from "react-hook-form"
interface Props extends UseControllerProps {
    placeholder:string
}

export default function AppTextInput(props:Props) {
    const {fieldState, field} = useController({...props, defaultValue:''})
    return (
        <div className='w-full flex flex-col items-start justify-center'>
            <input 
                {...props}
                {...field}
                className={`input w-full ${fieldState?.error&&'border border-red-700 text-red-700'}`}
            />
            {
                fieldState?.error && 
                    <label className='text-red-700'>{fieldState.error?.message}</label>
            }
        </div>
    )
}