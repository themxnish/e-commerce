import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/Shop'
import { Link } from 'react-router-dom'
import { Edit } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
    const { user, navigate, backend_url, token, setUser, setToken, setCartItems } = useContext(ShopContext);

    const [isEditing, setIsEditing] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [ originalData, setOriginalData ] = useState({});

    useEffect(() => {
        if (user) {
            const newData = {
                name: user?.name,
                email: user?.email,
                phone: user?.phone ,
                address: user?.address 
            }
            setFormData(newData);
            setOriginalData(newData);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(`${backend_url}/api/user/update`, formData, {headers: { Authorization: `Bearer ${token}` }});
            if (response.data.success) {
                toast.success(response.data.message);
                setUser(response.data.user);
                setIsEditing(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleCancel = () => {
        setFormData({ ...originalData });
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        navigate('/login');
    }

    if (!user && !token) {
        return (
            <div className='flex flex-col items-center justify-center mt-10'>
                <p className='text-xl font-semibold text-gray-700'>You are not logged in.</p>
                <button onClick={() => navigate("/login")} className='mt-4 px-10 py-2 bg-gray-800 text-white transition'>Login</button>
            </div>
        );
    }

  return (
    <div className='flex flex-col items-center min-h-100'>
        <div className='w-full h-65 bg-gradient-to-b from-gray-500 to-gray-300 flex justify-center'></div>
            <div className='w-5/6 max-w-md bg-white shadow-lg rounded-lg px-6 py-8 text-center mt-[-10rem]'>
                <div className='w-24 h-24 bg-white rounded-full border border-white overflow-hidden mx-auto'>
                    <img src="https://static.thenounproject.com/png/5034901-200.png" alt="Profile" className='w-full h-full object-cover' />
                </div>

                <div className='flex items-center justify-center gap-2 mt-4'>
                    <h1 className='text-2xl font-bold'>User Profile</h1>
                    <button onClick={() => setIsEditing(!isEditing)}><Edit className='w-5 h-5 text-gray-600 hover:text-gray-800 transition cursor-pointer'/></button>
                </div>

                {!isEditing ? (
                    <div className='mt-4 space-y-1'>
                        <p className='text-xl font-semibold mt-6'>{formData?.name || "Guest User"}</p>
                        <p className='text-sm'>{formData?.email}</p>
                        <p className='text-sm'>{formData?.phone}</p>
                        <p className='text-sm mt-2 overflow-hidden'>{formData?.address}</p>

                        <div className='mt-6 flex flex-col sm:flex-row justify-center gap-3'>
                            <Link to="/orders" className='w-full sm:w-auto'>
                                <button className='w-full sm:w-36 bg-gray-200 px-4 py-2 hover:bg-gray-300 transition cursor-pointer'>My orders</button>
                            </Link>
                            <button onClick={handleLogout} className='w-full sm:w-36 bg-violet-200 px-4 py-2 hover:bg-violet-300 transition cursor-pointer'>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className='mt-4 space-y-3'>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className='w-full px-3 py-2 border' placeholder='Enter name'/>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className='w-full px-3 py-2 border' placeholder='Enter email'/>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className='w-full px-3 py-2 border' placeholder='Enter phone'/>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className='w-full px-3 py-2 border' placeholder='Enter address'/>

                        <div className='flex justify-center gap-4'>
                            <button onClick={handleSave} className='px-4 py-2 bg-gray-800 text-white cursor-pointer'>Save</button>
                            <button onClick={handleCancel} className='px-4 py-2 bg-gray-200 cursor-pointer'>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
    </div>
  )
}

export default Profile
