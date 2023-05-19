import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { cartSlice } from '../../features/Cart/cartSlice'
import { catalogSlice } from '../../features/catalog/catalogSlice'
import { accountSlice } from '../../features/account/accountSlice'

// export function configureStore() {
//     return createStore(counterReducer)
// }

export const store = configureStore({
    reducer: {
        cart:cartSlice.reducer,
        catalog:catalogSlice.reducer,
        account: accountSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelecter: TypedUseSelectorHook<RootState> = useSelector;