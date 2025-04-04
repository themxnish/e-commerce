import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if(response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
      <div className='bg-white p-8 py-6 shadow-md max-w-md rounded-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Admin Login</h1>
        <form onSubmit={onSubmit}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-semibold mb-2'>Email address</p>
                <input onChange={(e) => setEmail(e.target.value)}  className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='admin@email.com' />
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-semibold mb-2'>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='enter password' />
            </div>
            <button className='bg-black text-white mt-2 w-full px-4 py-2 rounded-md cursor-pointer' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
