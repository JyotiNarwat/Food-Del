import express from "express"
import { listOrder, placeOrder, verifyOrder } from "../controllers/orderController.js"
import authMiddleware from"../middleware/auth.js"

const orderRouter = express.Router();
orderRouter.post ("/place" ,authMiddleware , placeOrder);
orderRouter.post ("/verify" ,authMiddleware , verifyOrder);
orderRouter.get ("/list" , listOrder);

export default orderRouter;