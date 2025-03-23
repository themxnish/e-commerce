import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/Shop'
import Title from './Title';
import Item from './Item';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [best, setBest] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBest(bestProduct.slice(0, 4));
    }, [products]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={"Best"} text2={"Sellers"}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {best.map((item, index) => (
                <Item key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default BestSeller
