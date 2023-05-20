import Spinner from "../layouts/Spinner"

type Props = {
    loading:boolean,
    children:any
}

export default function LoadingButton(props:Props) {
    const {loading, children} = props
    return (
        
        <div className=''>
            {
                loading ? 
                    (<div className='flex items-center justify-center'>
                        <Spinner/>
                    </div>) 
                    : 
                    <div>
                        {children}
                    </div>
            }
        </div>
    )
}
