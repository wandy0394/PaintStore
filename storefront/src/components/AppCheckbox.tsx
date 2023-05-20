import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label:string
    disabled:boolean
}

export default function AppCheckbox(props:Props) {
    const {field} = useController({...props, defaultValue:false})
    return (
        <div className='flex items-center gap-2'>
            <input
                {...field}
                type='checkbox'
                checked={field.value}
                className='input'
                disabled={props.disabled}
            />
            {props.label}
        </div>
    )
}