export default function Hero() {
    const tagline:string = "Find everything you need to bring your worlds to life"
    const title:string = "Craft your vision"
    return (
        <div className='hero h-full p-16 bg-slate-400'>
            <div className="hero-content text-center  border-black border-4 ">
                <div className="max-w-lg flex flex-col items-center justify-end py-8">
                    <h1 className="text-5xl font-bold">{title.toUpperCase()}</h1>
                    <p>{tagline.toUpperCase()}</p>
                </div>
            </div>
        </div>
    )
}