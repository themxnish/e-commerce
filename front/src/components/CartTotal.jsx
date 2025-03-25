import React, { useContext } from 'react'
import { ShopContext } from '../context/Shop'
import Title from './Title'

const CartTotal = () => {
    const { currency, getCartAmount, delivery_fee} = useContext(ShopContext);
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  return (
    <div className='w-full'>
      <div className='text-2xl '>
        <Title text1='Estimated' text2='Total' />
      </div>
      <div className='mt-4 text-sm'>
        <div className='flex justify-between py-2 border-b border-gray-300'>
          <p className='font-medium'>Subtotal</p>
          <p>{currency}{subtotal}.00</p>
        </div>
        <div className='flex justify-between py-2 border-b border-gray-300'>
          <p className='font-medium'>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <div className='flex justify-between py-3 font-semibold text-lg'>
          <p>Total</p>
          <p>{currency}{total}.00/-</p>
        </div>
      </div>
    </div>
  )
}
export default CartTotal