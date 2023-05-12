import { Link, useLocation } from "react-router-dom";

const linkStyle = 'w-full h-full flex items-center justify-center'
const links = [
    {index:0, label:'Paints', link:'/catalog/paints'},
    {index:1, label:'Brushes', link:'/catalog/brushes'},
    {index:2, label:'Accessories', link:'/catalog/accessories'},
    {index:3, label:'Brands', link:'/catalog/brands'},
    {index:4, label:'Contact', link:'/contact'},
]



export default function AppBar() {
    const location = useLocation()
    return (
        <div className="w-full navbar bg-base-300 px-16">
            <div className="navbar-start">
                <div className="dropdown md:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Acrylic</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div>
            <div className='navbar-center flex items-center justify-center gap-2'>
                {
                    links.map((link, index)=>{
                        return (
                            <div key={index} className={`btn btn-ghost normal-case ${(location.pathname === link.link) && 'bg-slate-400'}`}>
                                <Link className={linkStyle} to={link.link}>
                                    {link.label}
                                </Link>
                            </div>
                        )
                    })
                }
             
            </div>
            <div className="navbar-end flex items-center justify-end">
                <div  className={`btn btn-ghost normal-case`}>
                    <Link className={linkStyle} to='/cart'>
                        Cart
                    </Link>
                </div>            
                <div  className={`btn btn-ghost normal-case`}>
                    <Link className={linkStyle} to='/'>
                        Login
                    </Link>
                </div>   
                <div  className={`btn btn-ghost normal-case`}>
                    <Link className={linkStyle} to='/'>
                        Register
                    </Link>
                </div>       
            </div>
        </div>
    )
}