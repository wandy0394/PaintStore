

type Props = {
    value:number
    // setValue:React.Dispatch<React.SetStateAction<number>>
    handleIncrement:() => void
    handleDecrement: () => void
}
export default function QuantityCounter(props:Props) {
    const {value, handleIncrement, handleDecrement} = props
    // function handleDecrement() {
    //     const newValue:number = value - 1
    //     if (newValue >= MIN_QTY) setValue(newValue)
    // }
    // function handleIncrement() {
    //     const newValue:number = value + 1
    //     if (newValue <= MAX_QTY) setValue(newValue)
    // }
    return (
        <div className='m-auto w-min flex items-center justify-center gap-2'>
            <button className='btn btn-ghost border border-base-300' onClick={handleDecrement}>-</button>
            <div className='text-lg w-16 text-center'>{value}</div>
            <button className='btn btn-ghost border-base-300' onClick={handleIncrement}>+</button>
        </div>
    )
}