import { createContext, useState, useEffect } from "react";
import { reviews, users } from "../assets/assets.js";
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

export const ShopProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 100;
    const backend_url = import.meta.env.VITE_BACKEND_URL
    
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState({});

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [ products, setProducts ] = useState([]);

    const [ token, setToken ] = useState('');

    const addToCart = async (id, size) => {
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

            toast.success('Item added to cart');
            return newCart;
        });
        if (token) {
            try {
                await axios.post(backend_url + '/api/cart/add', { userId: user?.id, itemId: id, size }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                toast.error(error.message);
            }
        }
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
        if (token) {
            try {
                await axios.post(backend_url + '/api/cart/update', { userId: user?.id, itemId: id, size, quantity }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backend_url}/api/cart/get`, { userId: user?.id }, { headers: { Authorization: `Bearer ${token}` } });
            if(response.data.success) {
                setCartItems(response.data.cartData);
            } 
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getCartAmount = () => {
        let total = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product.id.toString() === items);
            if (!itemInfo) {
                console.warn(`Product with ID ${items} not found.`);
                continue;
            }
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

    const getProducts = async () => {
        try{
            const response = await axios.get(`${backend_url}/api/product`);
            if(response.data.success) {
                setProducts(response.data.data);
            } else {
                toast.error(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const calculateOrderTotal = (items) => {
        let total = 0;
        for (const item of items) {
            const product = products.find(p => p.id.toString() === item.id.toString());
            const price = product ? product.price : 0;
            total += price * item.quantity;
        }
        return total + delivery_fee;
    }

    const getUserDetails = async (storedToken) => {
        try {
            const response = await axios.get(`${backend_url}/api/user/current`, {headers: { Authorization: `Bearer ${storedToken}` }});
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                toast.error("Failed to fetch user details");
            }
        } catch (error) {
            toast.error("Error getting user info");
        }
    };    

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        const initializeUser = async () => {
            if (localStorage.getItem('token')) {
                const storedToken = localStorage.getItem('token');
                setToken(storedToken);
                await getProducts();
                await getUserDetails(storedToken);
                await getUserCart(storedToken);
            }
        };
        initializeUser();
    }, []);
    

    const value = {
        products,
        reviews,
        currency,
        backend_url,
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
        calculateOrderTotal,
        navigate,
        user,
        setUser,
        token,
        setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopProvider