import Spinner from "../layouts/Spinner"

type Props = {
    loading:boolean,
    children:any
}

export default function LoadingButton(props:Props) {
    const {loading, children} = props
    return (
        
        <div className-='w-full h-full'>
            {
                loading ? 
                    (<div>
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
