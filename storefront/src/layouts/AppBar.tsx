import { Link, useLocation } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useAppSelecter } from "../app/store/configureStore";
import SignedInMenu from "./SignedInMenu";

const links = [
    {index:0, label:'Paints', link:'/catalog/paints'},
    {index:1, label:'Brushes', link:'/catalog/brushes'},
    {index:2, label:'Accessories', link:'/catalog/accessories'},
    {index:3, label:'Brands', link:'/catalog/brands'},
    {index:4, label:'Contact', link:'/contact'},
]



export default function AppBar() {
    const location = useLocation()
    const {cart} = useAppSelecter(state=>state.cart)
    const [itemCount, setItemCount] = useState<number>(0)
    const {user} = useAppSelecter(state=>state.account)
    
    useEffect(()=>{
        let count:number = 0
        count = cart?.items?.reduce((total, item)=>{
            return total += item.quantity
        }, 0)
        setItemCount(count)
    }, [cart])
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
                            <Link key={index} to={link.link}>
                                <div key={index} className={`btn btn-ghost normal-case ${(location.pathname === link.link) && 'bg-slate-400'}`}>
                                    {link.label}
                                </div>
                            </Link>
                        )
                    })
                }
             
            </div>
            <div className="navbar-end flex items-center justify-end">
                <Link  to='/cart'>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">{itemCount?itemCount:0}</span> 
                        <div  className={`btn btn-ghost normal-case`}>
                            Cart
                        </div>
                    </div>            
                </Link>
                {
                    user?<SignedInMenu/>
                        :<>
                            <Link  to='/login'>
                                <div  className={`btn btn-ghost normal-case`}>
                                    Login
                                </div>   
                            </Link>
                            <Link  to='/register'>
                                <div  className={`btn btn-ghost normal-case`}>
                                    Register
                                </div>       
                            </Link>
                        </>
                }
            </div>
        </div>
    )
}