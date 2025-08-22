import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../src/assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: [value] }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemsInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemsInfo) {
              itemsInfo.size = item;
              itemsInfo.quantity = cartItems[items][item];
              orderItems.push(itemsInfo);
            }
          }
        }
      }

      let orderData = {
        address : formData,
        items : orderItems,
        amount : getCartAmount() + delivery_fee
      }

      switch (method) {
        // api calls for cod
        case "cod":

          const response = await axios.post(backendUrl+'/api/order/place', orderData, {headers : {token}})

          if (response.data.success) {
            setCartItems({})
            navigate("/orders")
          }else{
            toast.error(response.data.message)
          }
          
          break;

        case "stripe" :

        const responseStripe = await axios.post(backendUrl+"/api/order/stripe", orderData,{headers: {token}})

        if (responseStripe.data.success) {
          const {session_url} = responseStripe.data 
          window.location.replace(session_url)
        }else{
          toast(responseStripe.data.message)
        }

          break;
      
        default:

          break;
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            required
            placeholder="First name"
            name="firstName"
            onChange={onChangeHandler}
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            required
            placeholder="Last name"
            name="lastName"
            onChange={onChangeHandler}
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={formData.city}
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="number"
            name="zipcode"
            onChange={onChangeHandler}
            value={formData.zipcode}
            placeholder="Zip code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={formData.country}
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="number"
          name="phone"
          onChange={onChangeHandler}
          value={formData.phone}
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* right side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYEMENT"} text2={"METHOD"} />
          {/* payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                onClick={() => setMethod("stripe")}
                src={assets.stripe_logo}
                className="h-5 mx-4"
                alt=""
              />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                onClick={() => setMethod("razorpay")}
                src={assets.razorpay_logo}
                className="h-5 mx-4"
                alt=""
              />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p
                onClick={() => setMethod(cod)}
                className="text-gray-500 text-sm font-medium mx-4 "
              >
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
