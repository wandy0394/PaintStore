// import { useState } from 'react'
import './App.css'
// import ProductList from '../../features/ProductList'
import AppBar from '../layouts/AppBar'
import Banner from '../layouts/Banner'
import AppRoutes from '../routes/AppRoutes'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className='w-full h-screen border border-red-500 flex flex-col items-center'>
      <ToastContainer position='bottom-right' theme='colored'/>
      <div className='w-full h-[10vh]'>
        <Banner/>
      </div>
      <AppBar/>
      <AppRoutes/>
      <div className='flex-1'>
        Footer goes here
      </div>
        {/* <Catalog products={products}/>  */}
        {/* <ProductList products={products}/>*/}
    </div>
  )
}

export default App
