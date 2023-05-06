import { useState } from 'react'
import './App.css'
import useGetProducts from '../../hooks/useGetProducts'
import Catalog from '../../features/Catalog'
import {Typography} from '@mui/material'
import ProductList from '../../features/ProductList'

function App() {
  const [products] = useGetProducts()
  return (
    <>
        <Typography variant='h1'>Paint Seller</Typography>
        <Catalog products={products}/>
        {/* <ProductList products={products}/> */}
    </>
  )
}

export default App
