import express from "express";
import {
  placeOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter = express.Router();

// admin features
orderRouter.post("/list", adminAuth,allOrders)
orderRouter.post("/status", adminAuth,updateStatus)

// payment
orderRouter.post("/place", authUser,placeOrder)
orderRouter.post("/stripe", authUser,placeOrderStripe)
orderRouter.post("/razorpay", authUser,placeOrderRazorPay)

// user feature

orderRouter.post("/usersorders", authUser, userOrders)

// verify payeent 

orderRouter.post("/verifystripe", authUser, verifyStripe)


export default orderRouter;