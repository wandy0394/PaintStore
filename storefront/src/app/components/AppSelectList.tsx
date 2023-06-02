import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label:string
    items:string[]
    defaultValue?:string
}

export default function AppSelectList(props:Props) {
    const {fieldState, field} = useController({...props})

    return (
        <div>
            <label className={`label ${!props.label && 'hidden'}`}>
                <span className="label-text">{props.label}</span>
            </label>
            <select 
                className={`select select-bordered w-full ${fieldState?.error && 'border border-red-700 text-red-700'}`}
                value={field.value}
                onChange={field.onChange}
                defaultValue={props.defaultValue}
            >
                <option disabled selected>{props.label}</option>
                {
                    props.items.map((item, index)=>{
                        return (
                            <option value={item} key={index}>{item}</option>
                        )
                    })
                }
            </select>
            {
                fieldState?.error && 
                    <label className='text-red-700'>{fieldState.error?.message}</label>
            }
        </div>
    )
}