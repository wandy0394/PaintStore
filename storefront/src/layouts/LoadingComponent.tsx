import Spinner from "./Spinner"

type Props = {
    message?:string
}

export default function LoadingComponent(props:Props) {
    const {message} = props
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-8'>
            <h1 className='text-2xl'>{message || 'Content is Loading...'}</h1>
            <Spinner/>
        </div>
    )
}

