import {UseControllerProps, useController} from "react-hook-form"
interface Props extends UseControllerProps {
    placeholder?:string
    value?:string
    label?:string
    multiline?:boolean
    maxLength?:number
    type?:string
}

export default function AppTextInput(props:Props) {
    const {fieldState, field} = useController({...props})
    return (
        <div className='w-full flex flex-col items-start justify-center'>
            <label className={`label ${!props.label && 'hidden'}`}>
                <span className="label-text">{props.label}</span>
            </label>
            
            {
                props.multiline
                    ? 
                    <textarea 
                        {...props}
                        {...field}
                        maxLength={props.maxLength}
                        className={`input input-bordered w-full ${fieldState?.error&&'border border-red-700 text-red-700'} min-h-[100px]`}
                    />
                    :
                    <input 
                        {...props}
                        {...field}
                        type={props.type}
                        className={`input input-bordered w-full ${fieldState?.error&&'border border-red-700 text-red-700'}`}
                    />
            }
            {
                fieldState?.error && 
                    <label className='text-red-700'>{fieldState.error?.message}</label>
            }
        </div>
    )
}