import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { UseControllerProps, useController } from 'react-hook-form'

interface Props extends UseControllerProps {

}

export default function AppDropzone(props:Props) {

    const {field, fieldState} = useController({...props})
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles[0] = Object.assign(acceptedFiles[0], {preview:URL.createObjectURL(acceptedFiles[0])})
        field.onChange(acceptedFiles[0])
    }, [field])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className='aspect-square h-72 bg-gray-200 hover:bg-gray-400 rounded cursor-pointer'>
            <form className={`flex border-4 border-dashed w-full h-full rounded justify-center items-center ${isDragActive ? 'border-green-500' : 'border-gray-500'}`}>
                <input {...getInputProps()} />
                <h4 className='text-2xl'>Drop Image Here</h4>
                {
                    fieldState?.error && 
                        <label className='text-red-700'>{fieldState.error?.message}</label>
                }
            </form>
        </div>
    )
}