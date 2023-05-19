import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelecter } from "../app/store/configureStore";

export default function RequireAuth() {
    const {user} = useAppSelecter(state => state.account);
    const location = useLocation();

    if (!user) {
        return <Navigate to ='/login' state={{from:location}}/>
    }

    return <Outlet/>
}