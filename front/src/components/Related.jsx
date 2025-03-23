import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/Shop'
import Item from './Item'
import Title from './Title'

const Related = ({category, subCategory}) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if(products.length > 0) {
            let copy = products.slice();
            copy = copy.filter((item) => category === item.category);
            copy = copy.filter((item) => subCategory === item.subCategory);
            setRelated(copy.slice(0, 5));
        }
    },[products]);
  return (
    <div className='my-22'>
      <div className='text-center text-3xl py-2'> 
        <Title text1={"You may also"} text2={"like"}/>
      </div>
      <div className='grid mt-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
            <Item key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  )
}
export default Related