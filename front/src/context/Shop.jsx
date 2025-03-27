import { createContext, useState, useEffect } from "react";
import { products, reviews, users } from "../assets/assets.js";
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

export const ShopProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 100;
    
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState({});

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

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

    const updateQuantity = async (id, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[id][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let total = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product.id === items);
            for (const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        total += cartItems[items][item] * itemInfo.price;
                    }
                } catch (error) {
                    console.log(error);
                }   
            }
        }
        return total;
    }
    
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
        getCartItems,
        updateQuantity,
        getCartAmount,
        navigate,
        user,
        setUser
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopProvider