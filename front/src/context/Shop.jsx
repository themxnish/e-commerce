import { createContext, useState, useEffect } from "react";
import { products, reviews } from "../assets/assets.js";
import { toast } from 'react-toastify'; 

export const ShopContext = createContext();

export const ShopProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState({});

    const addToCart = (id, size) => {
        if (!size) {
            toast.error('Please select a size');
            return;
        }
    
        setCartItems(prevCart => {
            let newCart = structuredClone(prevCart);
    
            if (!newCart[id]) {
                newCart[id] = {};
            }
    
            newCart[id][size] = (newCart[id][size] || 0) + 1;
    
            console.log("Updated Cart:");
            toast.success('Item added to cart');
            return newCart;
        });
    };
    
    const getCartItems = () => {
        return Object.values(cartItems).reduce((total, sizes) => 
            total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0), 0
        );
    };
    
    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const value = {
        products,
        reviews,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopProvider