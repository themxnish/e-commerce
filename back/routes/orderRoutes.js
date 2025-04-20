import express from 'express'
import { placeOrderCOD, allOrders, userOrders, orderStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/all', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, orderStatus)

orderRouter.post('/userorders', authUser, userOrders)

orderRouter.post('/cod', authUser, placeOrderCOD)

export default orderRouter