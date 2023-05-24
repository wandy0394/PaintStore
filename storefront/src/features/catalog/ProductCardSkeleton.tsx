
export default function ProductCardSkeleton() {
    return (
        <div className="card card-compact w-full bg-base-300 shadow-xl">
                <h2 className="card-title p-4 w-full h-24"></h2>
                <div className="card-body">
                    <p className='w-full text-center text-2xl'></p>
                    <div className="card-actions w-full justify-center grid grid-rows-2 place-items-center">
                    </div>
                </div>
        </div>        
    )
}