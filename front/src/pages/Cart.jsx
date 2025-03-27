import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/Shop'
import Title from '../components/Title'
import { Trash2 } from 'lucide-react';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [ cartData, setCartData ] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if(cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t-1 border-gray-300 pt-14 px-4 sm:px-8'>
      <div className='text-2xl font-semibold mb-8'>
        <Title text1={"Your"} text2={"Cart"}/>
      </div>
      {cartData.length > 0 ? (
        <div className="flex flex-col gap-6">
          {cartData.map((item, index) => {
            const foundProduct = products.find((product) => product.id === item.id);
            return (
              <div key={index} className="flex items-center justify-between border-b-1 border-gray-400 pb-4">
                <div className="flex items-start gap-4">
                  <img src={foundProduct.image[0]} alt={foundProduct.name} className="w-18 h-22 object-cover"/>
                  <div className="flex flex-col">
                    <Link to={`/products/${item.id}`} className="block hover:underline"><p className="text-md font-semibold">{foundProduct.name}</p></Link>
                    <p className="text-sm text-gray-500">{foundProduct.category}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-md font-semibold">{currency}{foundProduct.price}</p>
                      <p className="text-sm px-2 py-1 bg-gray-200">{item.size}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p>qty</p>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.size, Math.min(10, Number(e.target.value)))}
                    type="number" className="w-15 text-center text-sm px-2 py-1 bg-gray-200" defaultValue={item.quantity} min={1} max={10} />
                  <Trash2 onClick={() => updateQuantity(item.id, item.size, 0)} className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg py-10">Your cart is empty!</p>
      )}

      {cartData.length > 0 && (
        <div className="flex justify-end mt-10">
          <div className="w-full sm:w-[400px] bg-gray-100 p-6 shadow">
            <CartTotal />
            <button onClick={() => navigate('/checkout')} className="w-full bg-gray-900 text-white text-md font-semibold active:scale-95 transition py-3 mt-6">Proceed to Checkout</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default Cart
