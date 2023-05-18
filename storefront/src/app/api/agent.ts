import axios, { AxiosError, AxiosResponse } from 'axios'


axios.defaults.baseURL="http://localhost:5094/api/"
axios.defaults.withCredentials=true
import {toast} from 'react-toastify'

function responseBody(response:AxiosResponse) {
    return response.data
}

const sleep = () => new Promise(resolve=>setTimeout(resolve, 500))
axios.interceptors.response.use(async response => {
    await sleep()
    return response
}, (error: AxiosError) =>{
    const {data, status} = error.response as AxiosResponse
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = Object.values(data.errors);
                // for (const key in data.errors) {
                //     if (data.errors[key]) {
                //         modelStateErrors.push(data.errors[key])
                //     }
                // }
                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        case 404:
            toast.error(data.title)
            break;
        case 500:
            window.location.replace(`http://localhost:5173/server-error`)
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
})

const requests = {
    get: (url:string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url:string, body:{}) => axios.post(url).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody),
    put: (url:string, body:{}) => axios.put(url).then(responseBody)
}

const Catalog = {
    list: (params:URLSearchParams) => requests.get('products', params),
    details: (id:string) => requests.get(`products/${id}`),
    fetchFilters: ()=>requests.get(`products/filters`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Cart = {
    get: () => requests.get('cart'),
    addItem: (productId:number, quantity=1) => requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId:number, quantity=1) => requests.delete(`cart?productId=${productId}&quantity=${quantity}`),
}

export const agent = {
    Catalog,
    TestErrors,
    Cart
}