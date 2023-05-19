import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelecter } from "../app/store/configureStore"
import { signOutUser } from "../features/account/accountSlice"

export default function SignedInMenu() {
    const dispatch = useAppDispatch()
    const {user} = useAppSelecter(state=>state.account)
    const navigate = useNavigate()

    function handleSignOut() {
        dispatch(signOutUser())
        navigate('/')
    }
    return (
        <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn m-1 btn-ghost normal-case">{user?.email}</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                <li><a>My Orders</a></li>
                <li><div onClick={handleSignOut}>Logout</div></li>
            </ul>
        </div>
    )
}