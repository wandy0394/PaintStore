// import { useState } from 'react'
import './App.css'
import useGetProducts from '../../hooks/useGetProducts'
import Catalog from '../../features/Catalog'
// import ProductList from '../../features/ProductList'
import AppBar from '../../components/AppBar'
import Banner from '../../components/Banner'
import Hero from '../../components/Hero'

function App() {
  const [products] = useGetProducts()
  return (
    <div className='w-full min-h-screen border border-red-500 flex flex-col items-center'>
      <div className='w-full h-[10vh]'>
        <Banner/>
      </div>
      <AppBar/>
      <div className='w-full grid grid-rows-2 flex-1'>
        <div>
          <Hero/>
        </div>
        <div className='w-full grid md:grid-cols-3'>
          <div className='w-full bg-red-500'>
          </div>
          <div className='w-full bg-green-500'>
          </div>

          <div className='w-full bg-blue-500'>
          </div>
        </div>  
      </div>
      <div className='flex-1'>
        Footer goes here
      </div>
        {/* <Catalog products={products}/>  */}
        {/* <ProductList products={products}/>*/}
    </div>
  )
}

export default App
