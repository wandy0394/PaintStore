import { useState, useEffect, useCallback } from 'react'
import './App.css'
// import ProductList from '../../features/ProductList'
import AppBar from '../layouts/AppBar'
import Banner from '../layouts/Banner'
import AppRoutes from '../routes/AppRoutes'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCookie } from './util/util'
import { agent } from './api/agent'
import LoadingComponent from '../layouts/LoadingComponent'
import { useAppDispatch } from './store/configureStore'
import { getCartAsync, setCart } from '../features/Cart/cartSlice'
import { getCurrentUser } from '../features/account/accountSlice'

function App() {

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  const initApp = useCallback(async () => {
    try {
      await dispatch(getCurrentUser())
      await dispatch(getCartAsync())
    }
    catch (e) {
      console.log(e)
    }
  }, [dispatch])
  useEffect(()=>{
    initApp().then(()=> {
      setLoading(false)
    })

  }, [initApp])

  if (loading) return <div className='w-full h-screen'><LoadingComponent message='Loading app...'/></div>
  return (
    <div className='w-full min-h-screen border border-red-500 flex flex-col items-center'>
      <ToastContainer position='bottom-right' theme='colored'/>
      <div className='w-full h-[10vh]'>
        <Banner/>
      </div>
      <AppBar/>
      <AppRoutes/>
      <div className='flex-1'>
        Footer goes here
      </div>
    </div>
  )
}

export default App
