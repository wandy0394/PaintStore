import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../components/AppTextInput";
import AppSelectList from "../../app/components/AppSelectList";
import { Product } from "../../models/products";
import AppDropzone from "../../components/AppDropzone";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./productValidation";
import { agent } from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProduct } from "../catalog/catalogSlice";
import LoadingButton from "../../components/LoadingButton";

type Props = {
    item:Product | null
    brands:string[],
    productTypes:string[]
    setEditMode: (visible:boolean, item?:Product) => void
}

export default function ProductForm(props:Props) {
    const {control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting}} = useForm({
        resolver:yupResolver(validationSchema)
    })
    const {item, brands, productTypes, setEditMode} = props
    const watchFile = watch('file', null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (item && !watchFile && !isDirty) reset (item)

        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview)
        }
    }, [item, reset, watchFile, isDirty])


    async function handleSubmitData(data:FieldValues) {
        console.log(data)
        try {
            let response:Product
            if (item) {
                response = await agent.Admin.updateProduct(data)
            }
            else {
                response = await agent.Admin.createProduct(data)
            }
            dispatch(setProduct(response))
            setEditMode(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-3/4 flex flex-col items-center justify-center gap-4'>
            <div className="w-full flex items-center justify-between">
                <h1 className='text-2xl'>Create Product</h1>
            </div>          
            <form onSubmit={handleSubmit(handleSubmitData)} className='w-full grid grid-flow-row gap-4'>
                <AppTextInput 
                    control={control} 
                    name='name' 
                    value={item?.name ?? ''} 
                    label='Product Name'
                />
                <div className='w-full grid grid-cols-2 gap-8'>
                    <AppSelectList control={control} items={brands} name='brand' label="Brand" value={item?.brand ?? ''}/> 
                    <AppSelectList control={control} items={productTypes} name='productType' label="Product Type" value={item?.productType ?? ''}/> 
                </div>
                <div className='w-full grid grid-cols-2 gap-8'>
                    <AppTextInput 
                        control={control} 
                        name='price' 
                        value={item?.price.toString() ?? ''}
                        label='Price'
                        type='number'
                    />
                    <AppTextInput 
                        control={control} 
                        name='quantityInStock' 
                        value={item?.quantityInStock.toString() ?? ''}
                        label='Quantity'
                        type='number'
                    />
                </div>

                <AppTextInput 
                    control={control} 
                    name='description' 
                    value={item?.description ?? ''}
                    label="Description"
                    maxLength={500}
                    multiline={true}
                />

               <div className='w-full grid grid-cols-2 gap-8'>
                    <AppDropzone
                        control={control} 
                        name='file' 
                    />
                    {
                        watchFile 
                            ? <img src={watchFile.preview} alt="preview" className='w-full h-full'/>
                            : <img src={item?.imageUrl} alt={item?.name} className='aspect-square h-72'/>
                    }
                </div>
                <div className='w-full flex items-center justify-between'>
                    <div className='btn btn-secondary' onClick={()=>setEditMode(false)}>Cancel</div>
                    <LoadingButton loading={isSubmitting} >
                        <button type='submit' className='btn btn-success'>Submit</button>
                    </LoadingButton>
                </div>
            </form>
        </div>
    )
}