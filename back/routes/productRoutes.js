import express from "express";
import { addProduct, getProducts, removeProduct, getSingleProduct, searchProducts } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
    "/add", 
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1},
        { name: "image2", maxCount: 1}, 
        { name: "image3", maxCount: 1}, 
        { name: "image4", maxCount: 1}
    ]), 
    addProduct);
productRouter.get("/", getProducts);
productRouter.get("/search", searchProducts);
productRouter.delete("/remove/:id", adminAuth, removeProduct);
productRouter.get("/:id", getSingleProduct);

export default productRouter;