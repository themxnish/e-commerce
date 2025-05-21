import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import About from './pages/About'
import Collection from './pages/Collection'
import Profile from './pages/Profile'

import Top from './components/Top'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
    return (
        <div>
            <Top/>
            <ToastContainer/>
            <NavBar/>
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <SearchBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/collection" element={<Collection />} />
            </Routes>
            <Footer/>
        </div>
        </div>
    )
}

export default App