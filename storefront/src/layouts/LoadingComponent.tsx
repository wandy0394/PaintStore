type Props = {
    message?:string
}

export default function LoadingComponent(props:Props) {
    const {message} = props
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-8'>
            <h1 className='text-2xl'>{message || 'Content is Loading...'}</h1>
            <div
                className="inline-block h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                {/* <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >
                    Loading...
                </span> */}
                
            </div>
        </div>
    )
}