import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { Cart } from "../../models/cart"
import { agent } from "../../app/api/agent"
import { getCookie } from "../../app/util/util"

interface CartState {
    cart: Cart | null
    status: string
}

const initialState: CartState = {
    cart:null,
    status:'idle'
}

//createAsyncThunk<RetrnType, InputType>
export const addCartItemAsync = createAsyncThunk<Cart, {productId:number, quantity?:number}>(
    'cart/addCartItemAsync',
    async ({productId, quantity=1}, thunkApi) => {
        try {
            return await agent.Cart.addItem(productId, quantity)
        }
        catch (e) {
            return thunkApi.rejectWithValue({error: e.data})
        }
    }
)

export const removeCartItemAsync = createAsyncThunk<void, {productId:number, quantity:number, tag?:string}>(
    'cart/removeCartItemAsync',
    async ({productId,quantity}, thunkApi) => {
        try {
            console.log(quantity)
            await agent.Cart.removeItem(productId, quantity)
        }
        catch (e) {
            // console.log(e.message)
            return thunkApi.rejectWithValue({error: e.data})
        }
    }
)
export const getCartAsync = createAsyncThunk<Cart>(
    'cart/getCartAsync',
    async (_, thunkApi) => {
        try {
            return await agent.Cart.get()
        }
        catch (e) {
            // console.log(e.message)
            return thunkApi.rejectWithValue({error: e.data})
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId')) return false
        }
    }
)
export const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
    },
    extraReducers: (builder => {
        builder.addCase(addCartItemAsync.pending, (state, action)=>{
            console.log(action)
            state.status='pendingAddItem' + action.meta.arg.productId
        })

        builder.addCase(removeCartItemAsync.pending, (state, action)=>{
            console.log(action)
            state.status='pendingRemoveItem' + action.meta.arg.productId + (action.meta.arg.tag ? action.meta.arg.tag:'')
        })
        builder.addCase(removeCartItemAsync.fulfilled, (state, action)=>{
            const {productId, quantity} = action.meta.arg
            const itemIndex = state.cart?.items?.findIndex(i=>i.productId==productId)
            if (itemIndex == -1 || itemIndex === undefined) return
            state.cart.items[itemIndex].quantity -= quantity
            if (state.cart.items[itemIndex].quantity <= 0) {
                state.cart.items.splice(itemIndex, 1)
            }
            state.status='idle'
        })
        builder.addCase(removeCartItemAsync.rejected, (state, action)=>{
            state.status='idle'
            console.log(action)
        })
        builder.addMatcher(isAnyOf(addCartItemAsync.fulfilled, getCartAsync.fulfilled), (state, action)=>{
            state.cart = action.payload
            state.status='idle'
        })
        builder.addMatcher(isAnyOf(addCartItemAsync.rejected, getCartAsync.rejected), (state, action)=>{
            state.status='idle'
            console.log(action)
        })
    })
})

export const {setCart} = cartSlice.actions