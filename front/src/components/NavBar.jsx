import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/Shop.jsx';
import { Search, User, ShoppingCart, Menu, ArrowLeft } from 'lucide-react';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const {setShowSearch, getCartItems} = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Search onClick={() => {setShowSearch(true)}} className="w-5 h-5 cursor-pointer" />

      <NavLink to="/">
        <img src={assets.logo} alt="Logo" className="w-50 tracking-widest" />
      </NavLink>

      <ul className="hidden sm:flex gap-5 text-sm font-semibold">
        {["Home", "Collection", "About", "Contact"].map((item, index) => (
          <li key={index}>
            <NavLink  to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="group flex flex-col items-center gap-2">
              <p>{item}</p>
              <hr className="w-0 group-hover:w-2/4 transition-all duration-500 ease-in-out border-0 h-[1.5px] bg-black" />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5 relative">
        <div className="group relative">
          <User className="w-5 h-5 cursor-pointer" />
          <div className="absolute right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="flex flex-col gap-2 w-36 py-2 px-4 bg-slate-100 border border-gray-500 text-slate-500 rounded shadow-lg">
              <p className="cursor-pointer hover:text-black text-sm">Logout</p>
              <p className="cursor-pointer hover:text-black text-sm">Profile</p>
              <p className="cursor-pointer hover:text-black text-sm">Orders</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <p className="absolute -right-3 -top-3 bg-black text-white w-5 h-4 text-center flex justify-center items-center leading-4 aspect-square text-xs rounded-full"> {getCartItems()}</p>
        </Link>

        <Menu onClick={() => setOpen(true)} className="w-5 h-5 cursor-pointer sm:hidden" />
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-500 ${open ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setOpen(false)} className="flex items-center gap-5 p-3 cursor-pointer">
            <ArrowLeft className="w-5 h-5 cursor-pointer" />
            <p className="text-lg text-sm font-semibold">Menu</p>
          </div>
          {["Home", "Collection", "About", "Contact"].map((item, index) => (
            <NavLink key={index} onClick={() => setOpen(false)}  to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="py-2 pl-6 border border-b border-gray-200">
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
