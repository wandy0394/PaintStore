const MIN_QTY = 0
const MAX_QTY = 20

type Props = {
    value:number
    setValue:React.Dispatch<React.SetStateAction<number>>
}
export default function QuantityCounter(props:Props) {
    const {value, setValue} = props
    function handleDecrement() {
        const newValue:number = value - 1
        if (newValue >= MIN_QTY) setValue(newValue)
    }
    function handleIncrement() {
        const newValue:number = value + 1
        if (newValue <= MAX_QTY) setValue(newValue)
    }
    return (
        <div className='w-min flex items-center justify-center gap-2'>
            <button className='btn btn-ghost' onClick={handleDecrement}>-</button>
            <div className='text-lg'>{value}</div>
            <button className='btn btn-ghost' onClick={handleIncrement}>+</button>
        </div>
    )
}