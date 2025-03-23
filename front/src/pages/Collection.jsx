import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shop'
import { ChevronRight } from 'lucide-react'
import Item from '../components/Item'
import Title from '../components/Title'

function Collection() {
  const { products } = useContext(ShopContext);

  const [ filter, setFilter ] = useState(false);
  const [ filterProduct, setFilterProduct ] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filterProduct.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filterProduct.slice(startIndex, startIndex + itemsPerPage);

  const handleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]); 
    }
  }

  const handleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]); 
    }
  }

  const handleFilter = () => {
    let copy = products.slice()
    if(category.length > 0) {
      copy = copy.filter(item => category.includes(item.category))
    }
    if(subCategory.length > 0) {
      copy = copy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProduct(copy)
    setCurrentPage(1)
  }

  const sortProduct = () => {
    let copy = [...filterProduct];
    switch (sortType) {
      case 'low-high': copy.sort((a, b) => a.price - b.price); break;
      case 'high-low': copy.sort((a, b) => b.price - a.price); break;
      case 'a-z': copy.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'z-a': copy.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'latest': copy.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      default: handleFilter(); return;
    }
    setFilterProduct(copy);
  };

  useEffect(() => {
    handleFilter();
  },[category, subCategory])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div>
      <div 
        className="w-full h-[40vh] sm:h-[50vh] flex items-center justify-center text-white border border-black bg-cover bg-center hover:scale-101 transition-all duration-300 animate-fadeIn"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/12777202/pexels-photo-12777202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        >
      </div>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10'>
        <div className='min-w-50'>
          <p onClick={() => setFilter(!filter)} className='text-xl flex items-center cursor-pointer gap-2 font-semibold mb-3'>Filter
            <ChevronRight size={24} className={`h-4 sm:hidden transition-transform ${filter ? 'rotate-90' : ''}`} /> 
          </p>
          <div className={`border border-gray-400 pl-5 py-3 my-6 transition-all duration-300 ${filter ? 'block' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Categories</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={handleCategory}/>Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={handleCategory}/>Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={handleCategory}/>Kids
              </p>
            </div>
          </div>

          <div className={`border border-gray-400 pl-5 py-3 my-5 ${filter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Sub Categories</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Sarees'} onChange={handleSubCategory}/>Sarees
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Shirts'} onChange={handleSubCategory}/>Shirts
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Pajama'} onChange={handleSubCategory}/>Pajama
              </p>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-5'>
            <Title text1={'All'} text2={'Products'} />
            <select onChange={(e) => setSortType(e.target.value)} className='border-1 border-gray-300 text-sm px-2'>
              <option value='default'>Default</option>
              <option value='low-high'>Low to High</option>
              <option value='high-low'>High to Low</option>
              <option value='a-z'>A-Z</option>
              <option value='z-a'>Z-A</option>
              <option value='latest'>Latest</option>
            </select>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6'>
            {currentProducts.map((item, index) => (
              <Item key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
            ))}
          </div>

          {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm font-medium rounded-[3px] text-black ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentPage(index + 1)} 
                className={`px-3 py-1 text-sm font-medium cursor-pointer rounded-[3px] text-black ${currentPage === index + 1 ? 'font-bold underline' : ''}`}>
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm font-medium rounded-[3px] text-black ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
              Next
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
export default Collection