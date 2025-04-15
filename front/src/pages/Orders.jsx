import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/Shop'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import BestSeller from '../components/BestSeller'
import axios from 'axios'

const Orders = () => {
  const { currency, backend_url, token } = useContext(ShopContext);
  const [ orderData, setOrderData ] = useState([]);

  const fetchOrders = async () => {
    try {
      if(!token) return null;
      const response = await axios.post(`${backend_url}/api/order/userorders`, {}, { headers: { Authorization: `Bearer ${token}` } });
      console.log("Backend response:", response.data);
      if(response.data.success) {
        let allOrders = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrders.push(item);
          })
        })
        console.log("Processed Orders:", allOrders);
        setOrderData(allOrders.reverse()); 
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [token])

  return (
    <div className='border-t pt-16 border-gray-300 px-4'>
      <div className='text-2xl font-semibold text-center sm:text-left'>
        <Title text1={"Your"} text2={"Orders"}/>
      </div>
      <div className='mt-6 space-y-6'>
        {orderData.length > 0 ? (
          orderData.slice(0, 5).map((item, index) => (
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
                <p className='text-sm text-gray-500 mt-1'>Order Date: {new Date(item.date).toDateString()}</p>
                <p className='text-sm text-gray-500 mt-1'>Payment Method: {item.paymentMethod}</p>
              </div>
              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-2 text-gray-600 text-sm font-medium'>
                  <span className='w-3 h-3 rounded-full bg-green-500'></span>
                  <p>{item.status}</p>
                </div>
                <button onClick={() => {}} className='mt-3 border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition'>
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
