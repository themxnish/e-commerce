import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/Shop'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import BestSeller from '../components/BestSeller'
import axios from 'axios'

const Orders = () => {
  const { currency, backend_url, token, products, calculateOrderTotal } = useContext(ShopContext);
  const [ orderData, setOrderData ] = useState([]);

  const fetchOrders = async () => {
    try {
      if(!token) return null;
      const response = await axios.post(`${backend_url}/api/order/userorders`, {}, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        const ordersGrouped = response.data.orders.map((order) => {
          const items = order.items.map(item => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date
          }));
          return { items, orderId: order._id };
        });
        setOrderData(ordersGrouped.reverse());
      }
    } catch (error) {
      console.log(error);
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
      <div className='mt-6 space-y-10'>
        {orderData.length > 0 ? (
          orderData.map((order, idx) => (
            <div key={idx} className='p-5 bg-gray-100 shadow-md space-y-5'>
              {order.items.map((item, index) => (
                <div key={index} className='flex flex-row md:flex-row items-center md:justify-start gap-6'>
                  <img src={item.image?.[0]} className='w-16 sm:w-20 object-cover' alt="" />
                  <div className='flex-1'>
                    <Link to={`/products/${item.id}`} className='hover:underline text-lg font-semibold'>{item.name}</Link>
                    <div className='flex items-center gap-4 mt-2 text-gray-700'>
                      <p className='text-lg font-semibold'>{currency}{item.price}</p>
                      <p className='text-sm'>Qty: {item.quantity}</p>
                      <p className='text-sm'>Size: {item.size}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center mt-4 border-t pt-4 border-gray-300'>
                <div className='space-y-1 text-sm text-gray-600'>
                  <p><strong>Order Date: </strong>{new Date(order.items[0].date).toDateString()}</p>
                  <p><strong>Payment Method: </strong>{order.items[0].paymentMethod}</p>
                  <div className='flex items-center gap-2 font-medium'>
                    <span className='w-3 h-3 rounded-full bg-green-500'></span>
                    <p>{order.items[0].status}</p>
                  </div>
                </div>
                <div className='w-full md:w-auto flex flex-col items-end mt-4 md:mt-0 md:items-end'>
                  <p className='text-lg font-semibold'>Order Total: {currency}{calculateOrderTotal(order.items)}</p>
                  <button onClick={() => {}} className='mt-2 border border-gray-300 bg-gray-200 font-semibold px-4 py-2 text-sm font-medium hover:bg-gray-300 transition'>Track Order</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center text-2xl'>No orders placed yet.</p>
        )}
      </div>
      <BestSeller />
    </div>
  )
}

export default Orders
