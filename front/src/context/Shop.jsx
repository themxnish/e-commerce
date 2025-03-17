import { createContext } from "react";
import { products, reviews } from "../assets/assets.js";

export const ShopContext = createContext();

export const ShopProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;

    const value = {
        products,
        reviews,
        currency,
        delivery_fee
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopProvider