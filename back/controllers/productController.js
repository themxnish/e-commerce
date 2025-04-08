import { v2 as cloudinary } from  'cloudinary';
import supabase from "../config/supabaseClient.js";
import { json } from 'express';


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, sub_category, sizes, stock, details, bestseller } = req.body;
    
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];
    
        const images = [image1, image2, image3, image4].filter(Boolean);
    
        let imagesUrl = await Promise.all(
          images.map(async (item) => {
            let data = await cloudinary.uploader.upload(item.path, { resource_type: "image", quality: "auto", fetch_format: "auto" });
            return data.secure_url;
          })
        );
    
        const productData = {
          name,
          description,
          price: Number(price),
          category,
          sub_category,
          sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
          stock,
          details,
          bestseller: bestseller === "true",
          date: Date.now(),
          image: imagesUrl
        };
    
        const { data: product, error } = await supabase.from('product').insert([productData]).select().single();
        if (error) throw error;
    
        const imageRecords = imagesUrl.map(url => ({ product_id: product.id, image_url: url }));
        await supabase.from('product_images').insert(imageRecords);
    
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
const getProducts = async (req, res) => {
    try {
        const products = await supabase.from('product').select('*');
        if (products.error) throw products.error;
        res.json({ success: true, data: products.data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('product').delete().eq('id', id);
        if (error) throw error;
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('product').select('*').eq('id', id).single();
        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addProduct, getProducts, removeProduct, getSingleProduct }