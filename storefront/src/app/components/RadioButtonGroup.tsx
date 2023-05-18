type Props = {
    options: any[],
    onChange: (e:any) => void
    selectedValue: string
}
export default function RadioButtonGroup(props:Props) {
    const {options, onChange, selectedValue} = props

    return (
        <ul 
            className='form-control w-full flex flex-col items-start gap-2 menu bg-base-300 rounded p-4' 
            onChange={onChange} 
        >
            {
                options.map((option, index)=>{
                    return (
                        <div key={'option-'+index} className='flex items-center gap-4'>
                            <input 
                                type="radio" 
                                checked = {option.value === selectedValue}
                                value={option.value}
                                className="radio checked:bg-teal-500" 
                            />
                            {option.label}
                        </div>
                    )
                })
            }
        </ul>
    )
}