import {Routes, Route} from 'react-router-dom'
import Landing from '../pages/landing/Landing'
// import Catalog from '../features/catalog/Catalog'
import CatalogLayout from '../layouts/CatalogLayout'
import Paints from '../pages/paints/Paints'

export default function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Landing/>}/>
            <Route path="catalog" element={<CatalogLayout/>}>
                <Route path="paints" element={<Paints/>}>
                    <Route path="acrylics" element={<h1>Acrylic Paints</h1>}/>    
                    <Route path="oils" element={<h1>Oil Paints</h1>}/>    
                    <Route path="enamels" element={<h1>Enamels Paints</h1>}/>    
                    <Route path="lacquers" element={<h1>Lacquer Paints</h1>}/>    
                    <Route path="*" element={<h1>Error 404: Page not found</h1>}/>
                </Route>
                <Route path="brushes" element={<h1>Brushes</h1>}/>
                <Route path="accessories" element={<h1>Accessories</h1>}/>
                <Route path="*" element={<h1>Error 404: Page not found</h1>}/>
            </Route>
            <Route path="contact" element={<h1>Contact</h1>}/>
            <Route path="*" element={<h1>Error 404: Page not found</h1>}/>
        </Routes>
    )
}