import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary()

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use("/api/user", userRouter)
app.use("/api/product", productRoute)


app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
