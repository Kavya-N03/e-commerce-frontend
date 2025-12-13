import Navigation from './Components/Navigation'
import NavBar from './Components/Navbar'
import FeaturedProducts from './pages/FeaturedProducts'
import Collections from './pages/Collections'
import ProductDetails from './Components/ProductDetails'
import { Route,Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Offers from './pages/Offers'
import Contact from './pages/Contact'
import Order from './Components/Order'

function App() {
  return(
    <>
    <Navigation/>
    <NavBar/>
    <Routes>
      <Route path="/" element={<FeaturedProducts/>}/>
      <Route path="/collections" element={<Collections/>}/>
      <Route path="/offers" element={<Offers/>}/>
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
    </>
    
  )
 
}

export default App
