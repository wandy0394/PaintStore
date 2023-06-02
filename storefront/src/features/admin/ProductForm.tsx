import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../components/AppTextInput";
import AppSelectList from "../../app/components/AppSelectList";
import { Product } from "../../models/products";
import AppDropzone from "../../components/AppDropzone";
import { useEffect } from "react";

type Props = {
    item:Product | null
    brands:string[],
    productTypes:string[]
    setEditMode: (visible:boolean, item?:Product) => void
}

export default function ProductForm(props:Props) {
    const {control, reset, handleSubmit, watch} = useForm()
    const {item, brands, productTypes, setEditMode} = props
    const watchFile = watch('file', null)
    useEffect(() => {
        if (item) reset (item)
    }, [item, reset])


    function handleSubmitData(data:FieldValues) {
        console.log(data)
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
                    defaultValue={item?.name ?? ''} 
                    label='Product Name'
                />
                <div className='w-full grid grid-cols-2 gap-8'>
                    <AppSelectList control={control} items={brands} name='brand' label="Brand" defaultValue={item?.brand ?? ''}/> 
                    <AppSelectList control={control} items={productTypes} name='productTypes' label="Product Type" defaultValue={item?.productType ?? ''}/> 
                </div>
                <div className='w-full grid grid-cols-2 gap-8'>
                    <AppTextInput 
                        control={control} 
                        name='price' 
                        defaultValue={item?.price.toString() ?? ''}
                        label='Price'
                        type='number'
                    />
                    <AppTextInput 
                        control={control} 
                        name='quantityInStock' 
                        defaultValue={item?.quantityInStock.toString() ?? ''}
                        label='Quantity'
                        type='number'
                    />
                </div>

                <AppTextInput 
                    control={control} 
                    name='description' 
                    defaultValue={item?.description ?? ''}
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
                    <button type='submit' className='btn btn-success'>Submit</button>
                </div>
            </form>
        </div>
    )
}