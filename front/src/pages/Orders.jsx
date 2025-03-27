import React, { useContext } from 'react'
import { ShopContext } from '../context/Shop'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import BestSeller from '../components/BestSeller'

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div className='border-t pt-16 border-gray-300 px-4'>
      <div className='text-2xl font-semibold text-center sm:text-left'>
        <Title text1={"Your"} text2={"Orders"}/>
      </div>
      <div className='mt-6 space-y-6'>
        {products.length > 0 ? (
          products.slice(0, 3).map((item, index) => (
            <div key={index} className='p-5 bg-gray-100 shadow-md flex flex-col md:flex-row items-center md:justify-between gap-6'>
              <img src={item.image?.[0]} className='w-16 sm:w-20 object-cover' alt="" />
              <div className='flex-1'>
                <Link to={`/products/${item.id}`} className='hover:underline text-lg font-semibold'>
                  {item.name}
                </Link>
                <div className='flex items-center gap-4 mt-2 text-gray-700'>
                  <p className='text-lg font-semibold'>{currency}{item.price}</p>
                  <p className='text-sm'>Qty: {item.quantity}</p>
                  <p className='text-sm'>Size: {item.size}</p>
                </div>
                <p className='text-sm text-gray-500 mt-1'>Order Date: {item.date || "N/A"}</p>
              </div>
              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-2 text-gray-600 text-sm font-medium'>
                  <span className='w-3 h-3 rounded-full bg-green-500'></span>
                  <p>Ready to Ship</p>
                </div>
                <button className='mt-3 border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition'>
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className='text-gray-500 text-center text-2xl'>No orders placed yet.</p>
          </div>
        )}
      </div>
      <BestSeller/>
    </div>
  )
}

export default Orders
