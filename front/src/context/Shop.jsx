import { createContext, useState } from "react";
import { products, reviews } from "../assets/assets.js";

export const ShopContext = createContext();

export const ShopProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const value = {
        products,
        reviews,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopProvider