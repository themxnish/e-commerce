import express from 'express'
import cors from 'cors'
import supabase from './config/supabaseClient.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connectCloudinary();

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', async (req, res) => res.json({ message: 'Hello from server!' }))

app.listen(port, () => console.log(`Server is running on port ${port}`))