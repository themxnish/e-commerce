import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shop.jsx';

  const Top = () => {
    const {token} = useContext(ShopContext);
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => { 
      if (token) {
        setShowMessage(true);
        const timer = setTimeout(() => {
          setShowMessage(false);
        }, 20000);
        return () => clearTimeout(timer);
      }
    }, [token]);

    if (!token && !showMessage) return null;

    return (
      <div className='w-full bg-gray-950 text-center py-2 text-sm text-white font-medium'>
        {!token ? (
          <p className='text-xs sm:text-sm'>
            Sign up now and get 10% off your first purchase!
            <a href='/login' className='text-blue-700 underline ml-2 hover:text-blue-900'>Join us</a>
          </p>
        ) : (
          showMessage && (
          <p className='text-xs sm:text-sm'> 
            👋 Welcome! Explore new arrivals and member-exclusive collection!
            <a href='/collection' className='text-blue-500 underline ml-2 hover:text-blue-700'>Check now</a>
          </p>
          )
        )}
      </div>
    );
  };

  export default Top;