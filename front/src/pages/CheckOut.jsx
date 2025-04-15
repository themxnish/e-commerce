import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { SiStripe, SiRazorpay, SiCashapp } from "react-icons/si";
import { ShopContext } from '../context/Shop'
import axios from 'axios'
import { toast } from 'react-toastify'

const CheckOut  = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, token, backend_url, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [ formData, setFormData ] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', state: '', zip: '', country: 'India', phone: ''
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
  
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product.id.toString() === itemId)
            );
            if (itemInfo) {
              itemInfo.quantity = cartItems[itemId][size];
              itemInfo.size = size;
              orderItems.push(itemInfo);
            }
          }
        }
      }
  
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
  
      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backend_url}/api/order/cod`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <form onSubmit={onSubmit} className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300 px-4 sm:px-8'>
      <div className='flex flex-col gap-4 w-full max-w-[480px] p-4 mx-auto sm:mx-0'>
        <div className='text-xl sm:text-2xl font-semibold my-3'>
          <Title text1={"Delivery"} text2={"Infomation"}/>
        </div>
        <div className='flex gap-3'>
          <input onChange={onChange} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-400 p-2 px-4 w-full' required/>
          <input onChange={onChange} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-400 p-2 px-4 w-full' required/>
        </div>
        <input onChange={onChange} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-400 p-2 px-4 w-full' required/>
        <input onChange={onChange} name='address' value={formData.address} type="text" placeholder='Address' className='border border-gray-400 p-2 px-4 w-full' required/>
        <div className='flex gap-3'>
          <input onChange={onChange} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-400 p-2 px-4 w-full' required/>
          <input onChange={onChange} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-400 p-2 px-4 w-full' required/>
        </div>
        <div className='flex gap-3'>
          <input onChange={onChange} name='zip' value={formData.zip} type="number" placeholder='Zip Code' className='border border-gray-400 p-2 px-4 w-full' required/>
          <input onChange={onChange} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-400 p-2 px-4 w-full' required/>
        </div>
        <input onChange={onChange} name='phone' value={formData.phone} type="number" placeholder='Phone Number' className='border border-gray-400 p-2 px-4 w-full' required/>
      </div>

      <div className='w-full max-w-[480px] bg-gray-100 p-5 mx-auto sm:mx-0 mt-6'>
        <CartTotal/>
        <div className='mt-8'>
          <Title text1={"Payment"} text2={"Method"}/>
          <div className='flex flex-col gap-3 mt-3'>
            <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 border py-3 px-4 cursor-pointer hover:bg-gray-200'>
              <p className={`w-4 h-4 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <SiStripe size={22} color="#635BFF" />
              <span className='text-sm font-medium'>Stripe</span>
            </div>    
            <div onClick={() => setMethod("razorpay")} className='flex items-center gap-3 border py-3 px-4 cursor-pointer hover:bg-gray-200'>
              <p className={`w-4 h-4 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <SiRazorpay size={22} color="darkblue-500" />
              <span className='text-sm font-medium'>Razorpay</span>
              </div>
            <div onClick={() => setMethod("cod")} className='flex items-center gap-3 border py-3 px-4 cursor-pointer hover:bg-gray-200'>
              <p className={`w-4 h-4 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <SiCashapp size={22} color="gray-700" />
              <p className='text-sm font-medium'>Cash on Delivery</p>
            </div> 
            
          </div>
        </div>
          <div className='text-center sm:text-right mt-8'>
            <button type='submit' className='w-full sm:w-auto bg-black text-white py-3 px-6 active:scale-95 transition-all duration-300'>Checkout</button>
          </div>
      </div>
    </form>
  )
}

export default CheckOut
