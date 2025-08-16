import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


const loginUser = async (req, res) => {

    try {

        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success : false,message: "User not found"})
        }

        const isMatch =  await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = generateToken(user._id)
            return res.json({success : true,token})
        }

        if (!isMatch) {
            return res.json({success : false, message: "Incorrect password"})
        }


        
    } catch (error) {
        console.log(error.message);
    return res.json({success : false,  message: "Error in login user" })
    }

}

const registerUser = async (req, res) => {
   try {
    const { name, email, password} = req.body

    // checking user already exist or not

    const exists = await userModel.findOne({ email: email })

    if (exists) {
        return res.json({success : false,  message: "User already exists" })
    }

    // validating email format and strong passsword

    if (!validator.isEmail(email)) {
         return res.json({success : false,  message: "Please enter a valid email" })
    }
    if (password.length < 8) {
         return res.json({success : false,  message: "Please enter a strong password" })
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword
    })

    const user = await newUser.save()

   const token = generateToken(user._id)

   return res.json({success : true, token})


   } catch (error) {
    console.log(error.message);
    return res.json({success : false,  message: "Error in registering user" })
    
   }
}

// for admin login 

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            return res.json({success : true, token})
        }else{
            res.json({success: false, message : "Invalid creditientials"})
        }
    } catch (error) {
        console.log(error.message);
    return res.json({success : false,  message: error.messgae })
    }
}

export {loginUser, registerUser, adminLogin}