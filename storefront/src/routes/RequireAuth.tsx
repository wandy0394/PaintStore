import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelecter } from "../app/store/configureStore";
import { toast } from "react-toastify";
type Props = {
    roles?: string[]
}
export default function RequireAuth({roles}:Props) {
    const {user} = useAppSelecter(state => state.account);
    const location = useLocation();

    if (!user) {
        return <Navigate to ='/login' state={{from:location}}/>
    }

    if (roles && !roles.some(r => user.roles.includes(r))) {
        toast.error('Not authorised to access this area')
        return <Navigate to='/'/>
    }
    return <Outlet/>
}