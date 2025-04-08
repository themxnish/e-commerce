import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

const List = ({ token }) => {
  const [ list, setList ] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product');
      if(response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, { headers: {token} })
      if(response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const remove = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      removeProduct(id);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div>
      <p className='text-2xl font-semibold mb-2'>All Products</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Stock</b>
          <b>Action</b>
        </div>

        {
          list.map((item, index) => (
            <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-3 gap-2 border border-gray-300 text-sm' key={index}>
              <div className='flex gap-2 items-center justify-center'>
                <img src={item.image[0]} className='w-16 h-16 object-cover hidden md:block' alt="product" />
                {item.image.slice(0, 2).map((img, i) => (
                <img key={i} src={img} alt={`product-${i}`} className={`w-20 h-20 object-cover md:hidden mt-2`}/>
                ))}
              </div>
          
              <div className='md:hidden flex flex-col gap-2 ml-8'>
                <div>
                  <p className='font-semibold truncate whitespace-nowrap overflow-hidden'>Name:</p>
                  <p>{item.name}</p>
                </div>
                <div className='flex'>
                  <div>
                    <p className='font-semibold'>Price:</p>
                    <p>{currency}{item.price}</p>
                  </div>
                  <div className='ml-10'>
                    <p className='font-semibold'>Category:</p>
                    <p>{item.category}</p>
                  </div>
                </div>
                <div className='flex'>
                  <div>
                    <p className='font-semibold'>Stock:</p>
                    <p>{item.stock}</p>
                  </div>
                  <div className='ml-10 mb-2'>
                    <span className='font-semibold'>Delete:</span>
                    <Trash2 onClick={() => remove(item.id)} className='w-5 h-5'/>
                  </div>
                </div>
              </div>

              <p className='hidden md:block truncate whitespace-nowrap overflow-hidden'>{item.name}</p>
              <p className='hidden md:block'>{currency}{item.price}</p>
              <p className='hidden md:block'>{item.category}</p>
              <p className='hidden md:block'>{item.stock}</p>
              <div className='hidden md:flex'>
                <Trash2 onClick={() => remove(item.id)} className='w-6 h-6 cursor-pointer hover:text-red-600'/>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List
