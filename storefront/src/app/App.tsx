// import { useState } from 'react'
import './App.css'
// import ProductList from '../../features/ProductList'
import AppBar from '../layouts/AppBar'
import Banner from '../layouts/Banner'
import AppRoutes from '../routes/AppRoutes'
function App() {
  return (
    <div className='w-full min-h-screen border border-red-500 flex flex-col items-center'>
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
