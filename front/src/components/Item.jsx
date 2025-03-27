import React, { useContext } from 'react'
import { ShopContext } from '../context/Shop'
import { Link } from 'react-router-dom'

const Item = ({ id, image, name, price }) => { 
    const { currency, addToCart } = useContext(ShopContext);
    
    return (
        <div className='flex flex-col h-full p-3'>
            <Link to={`/products/${id}`} className='block cursor-pointer'>
              <div className='overflow-hidden'>
                  <img className='border border-gray-400 hover:scale-105 transition-all duration-300 ease-in-out w-full h-64 object-cover' src={image[0]} alt={name} />
              </div>
            </Link>
            <p className='mt-4 text-sm font-medium text-gray-800'>{name}</p>
            <div className='flex-1'></div>
                <p className='text-gray-900 font-semibold text-md mt-auto text-left'>{currency}{price}</p>
            <button 
                onClick={() => addToCart(id, "M")} 
                className='w-full mt-auto py-3 bg-gray-200 active:scale-95 text-gray-900 font-semibold hover:bg-gray-300 transition'>
                Add to cart
            </button>
        </div>
    )
}
export default Item;