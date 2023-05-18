import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../models/products";
import { agent } from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";


type CatalogState = {
    productsLoaded: boolean,
    filtersLoaded: boolean,
    status:string,
    brands:string[],
    productTypes:string[]
    productParams:ProductParams,

}
const productsAdapter = createEntityAdapter<Product>()

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams()
    params.append("orderBy", productParams.orderBy)
    params.append("pageNumber", productParams.pageNumber.toString())
    params.append("pageSize", productParams.pageSize.toString())
    if (productParams.searchTerm) {
        params.append("searchTerm", productParams.searchTerm)
    }
    if (productParams.brands) {
        params.append("brands", productParams.brands.toString())
    }
    if (productParams.productTypes) {
        params.append("productTypes", productParams.productTypes.toString())
    }
    return params
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state:RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkApi)=>{
        const params = getAxiosParams(thunkApi.getState().catalog.productParams)
        try {
            return await agent.Catalog.list(params)
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

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters()
        }
        catch (e) {
            return thunkAPI.rejectWithValue({error:e.data})
        }
    }
)

function initParams() {
    return {
        pageNumber:1,
        pageSize:6,
        orderBy:'name',
        searchTerm:'',
        brands:[],
        productTypes:[],
    }
}

export const catalogSlice = createSlice({
    name:'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded:false,
        filtersLoaded:false,
        status:'idle',
        brands:[],
        productTypes:[],
        productParams: initParams()

    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false //to trigger useEffect to make api call
            state.productParams = {...state.productParams, ...action.payload}
        },
        resetProductParms: (state) => {
            state.productParams = initParams()
        }
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
        builder.addCase(fetchFilters.pending, state=>{
            state.status='pendingFetchFilters'
        })
        builder.addCase(fetchFilters.fulfilled, (state, action)=>{
            state.brands = action.payload.brands
            state.productTypes = action.payload.productTypes
            state.filtersLoaded = true
            state.status='idle'
        })
        builder.addCase(fetchFilters.rejected, (state, action)=>{
            state.status='idle'
            console.log(action)
        })
    })
    
})
export const productsSelectors = productsAdapter.getSelectors((state:RootState)=>state.catalog)
export const {setProductParams, resetProductParms} = catalogSlice.actions