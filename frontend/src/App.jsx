import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  // Deklaron nje state qe tregon nese popup-i i login duhet te shfaqet apo jo
  const [showLogin, setShowLogin] = useState(false)
  return (
<>
{/* nse showLogin esht true, shfaq komponentin LoginPopup dhe i kalon funksionin setShowLogin si props per ta mbyllur */}
{showLogin? <LoginPopup setShowLogin = {setShowLogin}/>:<></>}
 
  <div className='app'>
      {/* shfaq navin dhe i kalon setShowLogin qe te mund te hapet popup login nga aty */}

<Navbar setShowLogin = {setShowLogin}/>
{/* prd Routes pr te percak fqet e webit */}
 <Routes>
<Route path='/' element = {<Home/>} />
<Route path='/cart' element = {<Cart/>} />
<Route path='/order' element = {<PlaceOrder/>} />
<Route path='/verify' element = {<Verify/>} />
<Route path='/myorders' element = {<MyOrders/>} />
 </Routes>
    </div>
    <Footer/>

</>

  
  )
}

export default App
