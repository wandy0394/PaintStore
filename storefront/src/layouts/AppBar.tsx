import { Link } from "react-router-dom";

const linkStyle = 'w-full h-full flex items-center justify-center'

export default function AppBar() {
    return (
        <div className="w-full navbar bg-base-300">
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

                <div className="btn btn-ghost normal-case">
                    <Link className={linkStyle} to='/catalog/paints'>
                        Paints
                    </Link>
                </div>
                <div className="btn btn-ghost normal-case">
                    <Link className={linkStyle} to='/catalog/brushes'>
                        Brushes
                    </Link>
                </div>
                <div className="btn btn-ghost normal-case">
                    <Link className={linkStyle} to='/catalog/Accessories'>
                        Accessories
                    </Link>
                </div>
                <div className="btn btn-ghost normal-case">
                    <Link className={linkStyle} to='/catalog/brands'>
                        Brands
                    </Link>
                </div>
                <div className="btn btn-ghost normal-case">
                    <Link className={linkStyle} to='/contact'>
                        Contact
                    </Link>
                </div>
            </div>
            <div className="navbar-end">

            </div>
        </div>
    )
}