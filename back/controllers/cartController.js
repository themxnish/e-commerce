import supabase from '../config/supabaseClient.js';
const addToCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { itemId, size } = req.body;
    
        const { data: userData, error: fetchError } = await supabase.from('users').select('cart_data').eq('id', userId).single();
        if (fetchError) throw fetchError;  
        let cartData = userData.cart_data;
    
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
            } else {
            cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
    
        const { error: updateError } = await supabase.from('users').update({ cart_data: cartData }).eq('id', userId);
        if (updateError) throw updateError;
  
        res.json({success: true, message: 'Item added to cart'});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};  

const updateCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { itemId, size, quantity } = req.body;

        const { data: userData, error: fetchError } = await supabase.from('users').select('cart_data').eq('id', userId).single();
        if (fetchError) throw fetchError;  
        let cartData = userData.cart_data;

        cartData[itemId][size] = quantity;

        const { error: updateError } = await supabase.from('users').update({ cart_data: cartData }).eq('id', userId);
        if (updateError) throw updateError;

        res.json({success: true, message: 'Cart updated'});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.user?.id;

        const { data: userData, error: fetchError } = await supabase.from('users').select('cart_data').eq('id', userId).single();
        if (fetchError) throw fetchError;  
        let cartData = userData.cart_data;

        res.json({success: true, cartData});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getCart }