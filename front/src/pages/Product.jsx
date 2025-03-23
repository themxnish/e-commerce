import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaShareAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { ShopContext } from '../context/Shop'
import Related from '../components/Related';

const Product = () => {
  const { id } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [ product, setProduct ] = useState(false);
  const [ img, setImg ] = useState('');
  const [ size, setSize ] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const fetchProduct = () => {
    const foundProduct = products.find((item) => item.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setImg(foundProduct.image[0]);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };
  
  useEffect(() => {
    fetchProduct();
  }, [id, products]);

  return product ? (
    <div className='border-t-1 border-gray-300 pt-5 tranisition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex gap-3 sm:flex-row flex-col'>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={img} alt="" />
          </div>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-1'>
            {
              product.image.map((item, index) => (
                <img onClick={() => setImg(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out' alt="" />
              ))
            }
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-4 ml-4'>
          <h1 className='text-3xl font-semibold'>{product.name}</h1>
          <div className='flex items-center gap-1'>
            <span className='text-sm text-gray-500'>Category:</span>
            <span className='text-sm font-semibold text-gray-800'>{product.category}</span>
          </div>
          <p className='text-sm mt-4 text-gray-500 md:w-4/5'>{product.description}</p>
          <p className='text-2xl font-medium'>{currency}{product.price}</p>
          <div className='flex flex-col gap-4'>
          <p className='text-sm font-medium mt-1'>Select Size :</p>
            <div className='flex gap-2'>
              {
                product.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`text-sm px-2 py-1 bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition ${item === size ? 'border-2 border-black' : 'border-2 border-transparent'}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <div className='flex items-center gap-2 font-semibold'>
            {product.stock > 0 ? (
              <><BsCheckCircleFill className='text-green-600 w-5 h-5' />
                <p className='text-green-600'>In Stock</p></>
            ) : (
              <><BsXCircleFill className='text-red-600 w-5 h-5' />
                <p className='text-red-600'>Out of Stock</p></>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <MdLocalShipping className='text-black w-5 h-5' />
            <p className='text-sm text-gray-500'>
              Estimated Delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()} 
            </p>
          </div>
          <div className='flex gap-4 mt-4'>
            <button className='bg-black text-white px-8 py-3 active:scale-92 font-semibold hover:cursor-pointer transition-all duration-300 mt-4'>Add to cart</button>
            <button onClick={handleShare} className='px-4 py-3 mt-4 flex items-center gap-2 rounded-md active:scale-92 font-semibold hover:cursor-pointer transition-all duration-300'>
              <FaShareAlt /> Share
            </button>
          </div>
          <hr className='mt-8 sm:w-4/5 text-gray-400'/>
          <div className='text-sm mt-4 text-gray-500'>
            <ul className='flex flex-col gap-1'>
              <li>100% Original Products</li>
              <li>Payment on delivery available for this product</li>
              <li>Easy 7 day returns if you're not satisfied</li>
            </ul>
          </div>
        </div>
      </div>  
      <div className='mt-20 bg-gray-100 p-5'>
        <div className='flex justify-end'>
          <button className={`px-4 py-2 text-sm font-semibold hover:cursor-pointer ${activeTab === 'details' ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`} onClick={() => setActiveTab('details')}>Product details</button>
          <button className={`px-4 py-2 text-sm font-semibold hover:cursor-pointer ${activeTab === 'reviews' ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`} onClick={() => setActiveTab('reviews')}>Reviews</button>
        </div>
        <div className='flex flex-col gap-4 border px-4 py-4 text-sm'>
          {
            activeTab === 'details' ? (
              <p className='text-gray-800'>{product.details}</p>
            ) : (
              product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="shadow-md p-3 bg-white">
                    <p className="font-semibold">{review.user}</p>
                    <p className="text-gray-600">{review.comment}</p>
                    <div className="flex justify-start my-2">
                      {Array(review.rating)
                        .fill()
                        .map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-lg" />
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-gray-800'>No reviews yet</p>
              )
            )
          }
        </div>
      </div>    
      <Related category={product.category} subCategory={product.subCategory}/>
    </div>
  ) : 
  <div className='text-center py-8 text-3x opacity-0'>
     
  </div>
}
export default Product