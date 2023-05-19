import {useState, FormEvent} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { agent } from '../../app/api/agent'
import { FieldValues, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../app/store/configureStore'
import { toast } from 'react-toastify'


export default function Register() {
    const dispatch = useAppDispatch()

    const [validationErrors, setValidationErrors] = useState([])
    const {register, handleSubmit, formState:{isSubmitting, errors, isValid}} = useForm({
        mode:'onChange'
    })

    async function submitForm(data:FieldValues) {
        try {
            // await dispatch(regi(data))
            await agent.Account.register(data)
            toast.success('Registered successfully')
            navigate('/login')
        }
        catch (e) {
            setValidationErrors(e)
        }
    }

    const navigate = useNavigate()

    return (
        <div className='m-auto py-24 w-full h-screen'>

            <form 
                onSubmit={handleSubmit(submitForm)} 
                className='flex flex-col gap-y-4 items-center justify-center w-2/3 lg:w-1/3 py-8 mx-auto bg-base-300 rounded'
            >
                <h3 className='text-4xl font-bold'>Register</h3>
                <div className='flex flex-col gap-y-2 w-full px-8'>
                    <label className='text-xl'>Username:</label>
                    <input
                        className='input w-full'
                        type='text'
                        {...register('username', {required:'Username is required'})}
                    />
                    {
                        errors?.username &&
                            <label className='label-text text-red-700'>{errors?.username?.message as string}</label>
                    }                    
                </div>
                <div className='flex flex-col gap-y-2 w-full px-8'>
                    <label className='text-xl'>Email:</label>
                    <input
                        className='input w-full'
                        type='text'
                        {...register('email', {
                            required:'Email is required',
                            pattern: {
                                value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                                message:'Not a valid email address'
                            }
                        })}
                    />
                    {
                        errors?.email &&
                            <label className='label-text text-red-700'>{errors?.email?.message as string}</label>
                    }
                </div>
                <div className='flex flex-col gap-y-2 w-full px-8'>
                    <label className='text-xl'>Password:</label>
                    <input
                        className='input w-full'
                        type='password'
                        {...register('password', {
                            required:'Password is required',
                            pattern: {
                                value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                message:'Not a valid password'
                            }
                        })}
                    />
                    {
                        errors?.password &&
                            <label className='label-text text-red-700'>{errors?.password?.message as string}</label>
                    }
                </div>
                <div className='flex flex-col gap-y-8 items-center justify-center px-8 w-full'>
                    <button 
                        disabled={!isValid}
                        type='submit'
                        className='btn btn-primary px-2 py-1 align-middle w-full'
                    >
                        Register
                    </button>
                    <Link to='..' >Go Back</Link>
                </div>
                {
                    validationErrors && validationErrors.length > 0 &&
                    <div className='flex flex-col gap-2 items-start justify-center text-red-700 bg-red-100 rounded p-4'>
                        {        
                            validationErrors.map(error => {
                                return (
                                    <div>
                                        {error}
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </form>
        </div>
    )
}