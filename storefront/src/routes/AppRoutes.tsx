import {Routes, Route} from 'react-router-dom'
import Landing from '../pages/landing/Landing'
// import Catalog from '../features/catalog/Catalog'
import CatalogLayout from '../layouts/CatalogLayout'
import Paints from '../pages/paints/Paints'
import ProductDetails from '../features/catalog/ProductDetails'
import Contact from '../pages/Contact'
import ServerError from '../app/errors/ServerError'
import NotFound from '../app/errors/NotFound'
import CartPage from '../features/Cart/CartPage'
import CheckoutPage from '../features/checkout/CheckoutPage'
import Login from '../features/account/Login'
import Register from '../features/account/Register'
import RequireAuth from './RequireAuth'
import Orders from '../features/orders/Orders'

export default function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Landing/>}/>
            <Route path="catalog" element={<CatalogLayout/>}>
                <Route path=":productId" element={<ProductDetails/>}/>
                <Route path="paints" element={<Paints/>}>
                    <Route path="acrylics" element={<h1>Acrylic Paints</h1>}/>    
                    <Route path="oils" element={<h1>Oil Paints</h1>}/>    
                    <Route path="enamels" element={<h1>Enamels Paints</h1>}/>    
                    <Route path="lacquers" element={<h1>Lacquer Paints</h1>}/>    
                    <Route path="*" element={<NotFound/>}/>
                </Route>
                <Route path="brushes" element={<h1>Brushes</h1>}/>
                <Route path="accessories" element={<h1>Accessories</h1>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route path="contact" element={<Contact/>}/>
            <Route element={<RequireAuth/>}>
                <Route path="checkout" element={<CheckoutPage/>}/>
                <Route path="orders" element={<Orders/>}/>
            </Route>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="cart" element={<CartPage/>}/>
            <Route path="server-error" element={<ServerError/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}