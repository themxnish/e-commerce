import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const Orders = ({token}) => {
  const [ orders, setOrders ] = useState([]);

  const fetchOrders = async () => {
    if(!token) return null;
    try {
      const response = await axios.post(`${backendUrl}/api/order/all`, {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [token])
  return (
    <div className='p-4 sm:p-6 min-h-screen'>
      <p className='text-2xl font-semibold mb-8'>Orders</p>
      <div className='flex flex-col gap-6'>
        {orders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 sm:gird-cols-[0.5fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 p-4 border border-gray-300 text-sm bg-gray-50 shadow-sm'>
            <div>
              <p className='text-lg font-semibold'>Order ID: {order.id}</p>
            </div>
  
            <div className='mb-2 space-y-2'>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className='text-sm text-gray-700'>
                  {item.name} x {item.quantity} <span className='ml-1 text-gray-500 text-xs'>({item.size})</span>
                </div>
              ))}
            </div>
  
            <div>
              <p className='font-medium mb-1'>Shipping Address:</p>
              <p>{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zip}</p>
              <p>Phone: {order.address.phone}</p>
            </div>
  
            <div className='flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 text-gray-700'>
              <p><span className='font-medium'>Total Items:</span><br /> {order.items.length}</p>
              <p><span className='font-medium'>Payment Method:</span><br /> {order.paymentMethod}</p>
              <p><span className='font-medium'>Payment:</span><br /> {order.payment ? "Paid" : "Unpaid"}</p>
              <p><span className='font-medium'>Date:</span><br /> {new Date(order.date).toDateString()}</p>
            </div>
  
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2'>
              <p className='text-lg font-semibold'>{currency}{order.amount}.00</p>
              <select className='border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'>
                <option value='orderplaced'>Order Placed</option>
                <option value='packed'>Packed</option>
                <option value='outfordelivery'>Out for Delivery</option>
                <option value='shipped'>Shipped</option>
                <option value='delivered'>Delivered</option>
                <option value='cancelled'>Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Orders