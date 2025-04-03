import React from 'react'
import { NavLink } from 'react-router-dom'
import { CirclePlus, CircleCheck, DollarSign  } from 'lucide-react'

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-1 border-gray-400'>
        <div className='py-5 px-5 mt-3 text-lg font-bold text-gray-600 text-end hidden md:block'>
          <p>Admin Panel</p>
        </div>
      <div className='flex flex-col gap-4 pt-3 pl-[20%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-gray-400 border-solid py-2 px-3' to ="/add">
          <CirclePlus className='w-6 h-6 cursor-pointer'/>
          <p className='text-sm font-semibold hidden md:block'>Add Product</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-400 border-solid py-2 px-3' to ="/list">
          <CircleCheck className='w-6 h-6 cursor-pointer'/>
          <p className='text-sm font-semibold hidden md:block'>List Products</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-400 border-solid py-2 px-3' to ="/orders">
          <DollarSign className='w-6 h-6 cursor-pointer'/>
          <p className='text-sm font-semibold hidden md:block'>All Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
