import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
            <h1>Page not found</h1>
            <div className='btn btn-primary w-full'>
                <Link className='w-full h-full flex items-center justify-center' to='/'>
                    Return to Home
                </Link>
            </div>
        </div>
    )
}