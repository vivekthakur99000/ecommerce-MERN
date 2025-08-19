import orderModel from "../models/orderModel.js"
import  userModel from "../models/userModel.js"

// orders using cod
const placeOrder = async (req, res) => {
  try {

    const {userId, items, amount, address} = req.body

    const orderData = {
      userId, 
      items,
      address,
      amount,
      paymentMethod : "COD",
      payment : false,
      date : Date.now()
    }

    const newOrder = new orderModel(orderData)

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {cartData : {}})

    res.json({success : true, message : "Order placed"})

  } catch (error) {
    console.log(error);
    
    res.json({success : false, message : error.message})
  }
};

// stripe payment method
const placeOrderStripe = async (req, res) => {
  try {
  } catch (error) {}
};

// raxorpay method
const placeOrderRazorPay = async (req, res) => {
  try {
  } catch (error) {}
};

// All orders data for admin panel

const allOrders = async (req, res) => {
  try {
  } catch (error) {}
};

// user order data for frontend
const userOrders = async (req, res) => {
  try {
  } catch (error) {}
};

// update order status from admin panel

const updateStatus = async (req, res) => {
  try {
  } catch (error) {}
};

export {
  placeOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
