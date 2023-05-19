import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { User } from "../../models/user"
import { FieldValues } from "react-hook-form"
import { agent } from "../../app/api/agent"
import { toast } from "react-toastify"
import { setCart } from "../Cart/cartSlice"

type AccountState = {
    user: User | null,
}

const initialState: AccountState = {
    user:null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkApi) => {
        try {
            const userDTO = await agent.Account.login(data);
            const {cart, ...user} = userDTO
            if (cart) thunkApi.dispatch(setCart(cart));
            localStorage.setItem('user', JSON.stringify(user));
            return user
        }
        catch (e) {
            console.log(e)
            return thunkApi.rejectWithValue({error:e.data})
        }
    }
)

export const registerUser = createAsyncThunk<User, FieldValues>(
    'account/registerUser',
    async (data, thunkApi) => {
        try {
            const user = await agent.Account.register(data);
            // localStorage.setItem('user', JSON.stringify(user));
            return user
        }
        catch (e) {
            return thunkApi.rejectWithValue({error:e.data})
        }
    }
)

export const getCurrentUser = createAsyncThunk<User>(
    'account/getCurrentUser',
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
        try {
            const userDTO = await agent.Account.currentUser();
            const {cart, ...user} = userDTO
            if (cart) thunkApi.dispatch(setCart(cart));
            localStorage.setItem('user', JSON.stringify(user));
            return user
        }
        catch (e) {
            return thunkApi.rejectWithValue({error:e.data})
        }
    },
    {
        //do not call async method if condition fails
        condition:()=>{
            if (!localStorage.getItem('user')) return false
        }
    }
)


export const accountSlice = createSlice({
    name:'account',
    initialState:initialState,
    reducers: {
        signOutUser: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.user = null
            localStorage.removeItem('user')
            toast.error('Session expired - Please login again')
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled, getCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload
        }),
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            console.log(action.payload)
        })
    })
})

export const {signOutUser, setUser} = accountSlice.actions