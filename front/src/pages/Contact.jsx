import React from 'react';
import Title from '../components/Title';
import Policy from '../components/Policy';

const Contact = () => {
  return (
    <div className='min-h-[50vh] flex flex-col items-center border-t border-gray-300'>
      <div className='w-[90%] max-w-[400px]'>
        <div className='text-center pt-10 text-2xl'>
          <Title text1={'Contact'} text2={'Us'} />
        </div>
        <div className='w-full max-w-3xl mt-10 space-y-8 text-gray-800'>
          <div>
            <h3 className='text-lg font-semibold'>Our Store</h3>
            <p className='text-gray-600'>123 Fabric Street, Pune City, India 411001</p>
          </div>
          
          <div>
            <h3 className='text-lg font-semibold'>Contact Information</h3>
            <p className='text-gray-600'>Phone: (123) 456-7890</p>
            <p className='text-gray-600'>Email: <a href='mailto:support@fabricsworld.com' className='text-gray-800 font-medium hover:underline'>support@fabricsworld.com</a></p>
          </div>
          
          <div>
            <h3 className='text-lg font-semibold'>Store Hours</h3>
            <p className='text-gray-600'>Monday - Friday: 9 AM - 6 PM</p>
            <p className='text-gray-600'>Saturday: 10 AM - 4 PM</p>
            <p className='text-gray-600'>Sunday: Closed</p>
          </div>
        </div>
      </div>
      <div className='w-[90hv] mt-10'>
        <Policy />
      </div>
    </div>
  );
};

export default Contact;
