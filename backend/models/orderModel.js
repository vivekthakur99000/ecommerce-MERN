import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: {type : String, required : true },
    items: {type : Arrays, required : true },
    amount: {type : Number, required : true },
    address: {type : Object, required : true },
    status: {type : String, required : true, default : "Order Placed " },
    paymentMethod: {type : String, required : true },
    payment: {type : boolean, required : true, default: false },
    date : {type : Number, required : true}
})

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
export default orderModel;