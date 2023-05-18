import { useState } from "react"

type Props = {
    title?:string
    items: string[],
    checked?: string[],
    onChange?: (item:string[]) => void
}

export default function CheckboxGroup(props:Props) {
    const {title, items, checked, onChange} = props

    const [checkedItems, setCheckedItems] = useState<string[]>(checked || [])
    
    function check(item:string) {
        if (item === undefined || item === null) return
        let newState:string[] = []
        if (checkedItems.includes(item)) {
            newState = [...checkedItems].filter(selected=>selected !== item)
        }
        else {
            newState = [...checkedItems, item]
        }
        setCheckedItems(newState)
        onChange(newState)
    }
   
    return (
        <ul className='w-full flex flex-col items-start gap-2 menu bg-base-300 rounded p-4'>
            <li className='menu-title'>
                <span>{title}</span>
            </li>
            {
                items.map((item, index)=>{
                    return (
                        <div key={'checkbox-'+index} className='flex items-center gap-4'>
                            <input 
                                type="checkbox" 
                                checked={checkedItems.includes(item)} 
                                className="checkbox" 
                                onClick={()=>check(item)}
                                onChange={()=>null}
                            />
                            {item}
                        </div>
                    )
                })
            }
        </ul>
    )
}