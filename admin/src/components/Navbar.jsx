import React from 'react'
import logo from '../assets/logo.png'
import { Search } from 'lucide-react';

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between px-[4%] py-3'>
      <div className='flex items-center gap-4'>
        <img className='w-48 tracking-widest' src={logo} alt="admin logo" />
      </div>
      <div className='hidden sm:flex items-center px-3 py-1 border border-gray-600 rounded-full w-72'>
        <Search className='w-5 h-5 text-gray-600'/>
        <input type='text' placeholder='search...' className='bg-transparent outline-none text-sm pl-2 w-full' />
      </div>
      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-4 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
