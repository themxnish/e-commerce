import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/Shop'
import Title from './Title';
import Item from './Item';  

const NewCollection = () => {
    const { products } = useContext(ShopContext);
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        if (Array.isArray(products) && products.length > 0) {
            setLatest(products.slice(0, 8));
        }
    }, [products]);    

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={"New"} text2={"Collection"}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latest.map((item, index) => (
                <Item key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default NewCollection