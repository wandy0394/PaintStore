import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models/products";
import { agent } from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkApi)=>{
        try {
            return await agent.Catalog.list()
        }
        catch (e) {
            return thunkApi.rejectWithValue({error: e.data})
        }
    }
)
export const fetchProductByIdAsync = createAsyncThunk<Product, string>(
    'catalog/fetchProductsByIdAsync',
    async (productId:string, thunkApi)=>{
        try {
            return await agent.Catalog.details(productId)
        }
        catch (e) {
            return thunkApi.rejectWithValue({error: e.data})
        }
    }
)

export const catalogSlice = createSlice({
    name:'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers: {

    },
    extraReducers:(builder=>{
        builder.addCase(fetchProductsAsync.pending, state=>{
            state.status='pendingFetchProducts'
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, action)=>{
            productsAdapter.setAll(state, action.payload)
            state.status='idle'
            state.productsLoaded = true
        })
        builder.addCase(fetchProductsAsync.rejected, (state, action)=>{
            state.status='idle'
            console.log(action)
        })

        builder.addCase(fetchProductByIdAsync.pending, state=>{
            state.status='pendingFetchProductById'
        })
        builder.addCase(fetchProductByIdAsync.fulfilled, (state, action)=>{
            productsAdapter.upsertOne(state, action.payload)
            state.status='idle'
        })
        builder.addCase(fetchProductByIdAsync.rejected, (state, action)=>{
            state.status='idle'
            console.log(action)
        })
    })
    
})
export const productsSelectors = productsAdapter.getSelectors((state:RootState)=>state.catalog)