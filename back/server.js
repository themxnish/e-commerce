import express from 'express'
import cors from 'cors'
import supabase from './config/supabaseClient.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

connectCloudinary();

app.use('/api/user', userRouter);

app.get('/', async (req, res) => res.json({ message: 'Hello from server!' }))

app.listen(port, () => console.log(`Server is running on port ${port}`))