import { ChangeEvent, useCallback, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {
    const {productParams} = useAppSelecter(state=>state.catalog)
    const [searchTerm, setSearchTerm] = useState<string>(productParams.searchTerm)
    const dispatch = useAppDispatch()

    function debounce(func:Function, timeout:number = 250) {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(()=>{
                func.apply(this, args)
            }, timeout)
        }
    }

    const debouceSearch = useCallback(
        debounce((e:ChangeEvent<HTMLInputElement>)=>dispatch(setProductParams({searchTerm:e.target.value, pageNumber:1})), 750),
        []
    )


    return (
        <div className='form-control w-full'>
            <label className="label">
                <span className="label-text">Search products</span>
            </label>
            <input 
                className='input input-bordered w-full' 
                placeholder='Search...'
                value={searchTerm}
                onChange={(e)=>{
                    setSearchTerm(e.target.value)
                    debouceSearch(e)
                }}
            />
        </div>
    )
}