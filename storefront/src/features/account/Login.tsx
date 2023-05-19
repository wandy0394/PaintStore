import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {FieldValues, useForm} from 'react-hook-form'
import LoadingButton from '../../components/LoadingButton'
import { useAppDispatch } from '../../app/store/configureStore'
import { signInUser } from './accountSlice'

export default function Login() {


    const dispatch = useAppDispatch()

    const {register, handleSubmit, formState:{isSubmitting, errors, isValid}} = useForm({
        mode:'onTouched'
    })

    async function submitForm(data:FieldValues) {
        try {
            await dispatch(signInUser(data))
            navigate('/')
        }
        catch (e) {
            console.log(e)
        }
    }

    const navigate = useNavigate()

    return (
        <div className='m-auto py-24 w-full h-full'>
            <form 
                onSubmit={handleSubmit(submitForm)} 
                className='flex flex-col gap-y-4 items-center justify-center rounded w-2/3 lg:w-1/3 py-8 mx-auto bg-base-300'
            >
                <h3 className='text-4xl font-bold'>Log in</h3>
                <div className='flex flex-col gap-y-2 w-full px-8'>
                    <label className='text-xl'>Username:</label>
                    <input
                        className='w-full input'
                        type='text'
                        {...register('username', {required:'Username is required'})}
                    />
                </div>
                <div className='flex flex-col gap-y-2 w-full px-8'>
                    <label className='text-xl'>Password:</label>
                    <input
                        className='w-full input'
                        type='password'
                        {...register('password', {required:'Password is required'})}
                    />
                </div>
                <div className='flex flex-col gap-y-8 items-center justify-center w-full px-8'>
                    <LoadingButton loading={isSubmitting}>
                        <button 
                            disabled={!isValid}
                            type='submit' 
                            className='btn btn-primary px-2 py-1 align-middle w-full'
                        >
                            Login
                        </button>
                    </LoadingButton>
                    <Link to='..' >Go Back</Link>
                </div>
                <div className='text-red-700'>
                    {!!errors.username}
                    {!!errors.password}
                </div>
            </form>
        </div>
    )
}