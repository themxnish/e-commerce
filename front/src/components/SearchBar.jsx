import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/Shop'
import { X, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch, products } = useContext(ShopContext);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        setShow(location.pathname === "/" || location.pathname.includes("collection"));
        setShowSearch(false);
    }, [location]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowSearch(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }, []);

    const filteredResult = products?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    const handleSearch = (id) => {
      setShowSearch(false);
      setSearch("");
      navigate(`/products/${id}`);
    }

  return showSearch && show ? (
    <div className='p-4 flex flex-col items-start relative ' ref={searchRef}>
      <div className='flex items-center gap-2 w-full md:w-1/2 lg:w-1/3 sm:w-1/2 bg-gray-200 px-4 py-2 shadow-md'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='search fabrics' className='flex-1 outline-none bg-transparent text-sm font-semibold'/>
        <Search className='w-4'/>
        <X className='inline w-5 cursor-pointer' onClick={() => setShowSearch(false)}/>
      </div>
      {search && filteredResult?.length > 0 && (
        <div className='absolute top-full left-3 w-full md:w-1/2 lg:w-1/3 sm:w-1/2 bg-gray-200 p-3 shadow-lg mt-0 z-10'>
          {filteredResult?.map((item) => (
            <div key={item.id} onClick={() => handleSearch(item.id)} className='flex items-center justify-between py-2 border-b last:border-none cursor-pointer hover:underline transition'>
              <p className='text-sm font-medium'>{item.name}</p>
              <img src={item.image} alt={item.name} className='w-10 h-10 object-cover'/>
            </div>
          ))}
        </div> 
      )}
    </div>
  ) : null
}

export default SearchBar