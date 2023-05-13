import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Cart } from "../../models/cart"
import { agent } from "../../app/api/agent"

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
    async ({productId, quantity=1}) => {
        try {
            return await agent.Cart.addItem(productId, quantity)
        }
        catch (e) {
            console.log(e.message)
        }
    }
)

export const removeCartItemAsync = createAsyncThunk<void, {productId:number, quantity:number, tag?:string}>(
    'cart/removeCartItemAsync',
    async ({productId,quantity}) => {
        try {
            console.log(quantity)
            await agent.Cart.removeItem(productId, quantity)
        }
        catch (e) {
            console.log(e.message)
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
        // removeItem: (state, action) => {
        //     const {productId, quantity} = action.payload
        //     const itemIndex = state.cart?.items.findIndex(i=>i.productId==productId)
        //     if (itemIndex == -1 || itemIndex === undefined) return
        //     state.cart.items[itemIndex].quantity -= quantity
        //     if (state.cart.items[itemIndex].quantity <= 0) {
        //         state.cart.items.splice(itemIndex, 1)
        //     }
        // }
    },
    extraReducers: (builder => {
        builder.addCase(addCartItemAsync.pending, (state, action)=>{
            console.log(action)
            state.status='pendingAddItem' + action.meta.arg.productId
        })
        builder.addCase(addCartItemAsync.fulfilled, (state, action)=>{
            state.cart = action.payload
            state.status='idle'
        })
        builder.addCase(addCartItemAsync.rejected, (state, action)=>{
            state.status='idle'
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
        })
    })
})

export const {setCart} = cartSlice.actions