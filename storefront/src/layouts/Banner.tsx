import { Link } from "react-router-dom";

export default function Banner() {
    return (
        <div className='w-full h-full bg-teal-500 py-4 px-16 flex items-center justify-between'>
            <h2 className='text-2xl font-bold btn btn-ghost'>
                <Link to='/'>
                    Crafted Colours
                </Link>
            </h2>
            <h3 className='font-medium'>Every World, Every Scale</h3>
        </div>
    )
}