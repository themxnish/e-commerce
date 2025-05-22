import React, { useContext } from 'react'
import { ShopContext } from '../context/Shop'
import { Link } from 'react-router-dom'

const Item = ({ id, image, name, price }) => { 
    const { currency } = useContext(ShopContext);
    
    return (
        <div className='flex flex-col h-full p-3 bg-white border border-gray-300 rounded-2xl shadow-lg'>
            <Link to={`/products/${id}`} className='block cursor-pointer'>
              <div className='overflow-hidden'>
                  <img className='rounded-2xl hover:scale-102 transition-all duration-300 ease-in-out w-full h-64 object-cover' src={image[0]} alt={name} />
              </div>
            </Link>
            <p className='mt-4 text-md font-semibold text-gray-800'>{name}</p>
            <div className='flex-1'></div>
                <p className='text-gray-900 font-bold text-md mt-auto text-left'>{currency}{price}</p>
        </div>
    )
}
export default Item;