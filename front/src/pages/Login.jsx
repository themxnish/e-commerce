import React, {useState, useContext, useEffect} from 'react'
import { ShopContext } from '../context/Shop'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [ state, setState ] = useState('Login');
  const { token, setToken, navigate, backend_url } = useContext(ShopContext);
  
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (state === 'Sign Up') {
      if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return;
      }    
    }
    try{
      if(state === 'Sign Up'){
        const response = await axios.post(backend_url + '/api/user/register', { name, email, password });
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } if(state === 'Login'){
        const response = await axios.post(backend_url + '/api/user/login', { email, password });
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token, navigate])

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form onSubmit={onSubmit} className='flex flex-col items-center w-96 m-auto p-6 mt-10 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='text-2xl font-semibold text-gray-700 text-center'>{state}</p>
        </div>
        {state === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-600' placeholder='Username' required/>}
        <input onChange={(e) => setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-600' placeholder='Email' required/>
        <input onChange={(e) => setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-600' placeholder='Password' required/>
        {state === 'Login' ? '' : <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-600' placeholder='Confirm Password' required/>}
        <div className='w-full flex justify-end'>
          <p className='cursor-pointer text-sm text-gray-600'>Forgot your password?</p>
        </div>
        <button className='bg-black text-xl text-white font-semibold px-8 py-2 mt-6 cursor-pointer'>{state === 'Login' ? 'Sign In' : 'Sign Up'}</button>
        <div className='flex items-center w-full my-2'>
          <div className='flex-1 border-t border-gray-400'></div>
          <span className='px-3 text-gray-500 text-sm'>OR</span>
          <div className='flex-1 border-t border-gray-400'></div>
        </div>
        <div className='flex justify-center space-x-4'>
          <button className='p-2 border border-gray-400 hover:bg-gray-100 rounded-full cursor-pointer'><FcGoogle size={20} /></button>
          <button className='p-2 border border-gray-400 hover:bg-gray-100 rounded-full text-blue-600 cursor-pointer'><FaFacebookF size={20} /></button>
          <button className='p-2 border border-gray-400 hover:bg-gray-100 rounded-full text-blue-700 cursor-pointer'><FaLinkedinIn size={20} /></button>
        </div>
      <div className='text-center text-sm text-gray-600 mt-4'>
        {state === 'Sign Up' ? 'Already a user?' : 'Need an account?'}
        <button onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')} className='text-pink-500 ml-1 cursor-pointer'>
          {state === 'Sign Up' ? 'Login' : 'Sign Up'}
        </button>
      </div>
    </form>
    </div>
  )
}

export default Login
