import supabase from '../config/supabaseClient.js';
const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { items, amount, address } = req.body;
        const orderData = { userId, items, amount, address, paymentMethod: 'COD', payment: false, date: Date.now() };

        const { data, error } = await supabase.from('orders').insert([orderData]).select();
        const { error: cartError } = await supabase.from('users').update({ cart_data: {} }).eq('id', userId);

        res.json({ success: true, message: 'Order placed successfully', order: data[0] });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


  

const placeOrderStripe = async (req, res) => {
    try {

    } catch (error) {

    }
}

const placeOrderRazorpay = async (req, res) => {
    try {

    } catch (error) {

    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await supabase.from('orders').select('*');
        res.json({ success: true, message: 'Orders fetched successfully', orders: orders.data });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }    
}

const userOrders = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { data, error } = await supabase.from('orders').select().eq('userId', userId);
        res.json({ success: true, message: 'Orders fetched successfully', orders: data });
    } catch (error) {
        res.json({ success: false, message: error.message });
    } 
}

const orderStatus = async (req, res) => {
    try {

    } catch (error) {

    }
}

export { placeOrderCOD, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, orderStatus };