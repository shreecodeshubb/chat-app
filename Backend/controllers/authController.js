import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import bcrypt from "bcrypt";



//Register Controller

export const Register = async (req,res)=>{
    
    try {
        const{name, email,password} = req.body;

       const existedUser = await User.findOne({email});
       if(existedUser) return res.status(400).json({message:"user Already exist"})

      
       
      const hashPass = await bcrypt.hash(password,10);


      const user = await User.create({name,email,password:hashPass});
        const token = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        maxAge: 7*24*60*60*1000
      });
      res.status(201).json({message:"User Created Successfully"})
       


    } catch (error) {
        console.error("Error while user Registration", error)
    }
}


// Login Controller

export const Login = async(req,res)=>{
   
   try {
     const {email, password} = req.body;

   const existUser = await User.findOne({email});
   if(!existUser) return res.status(401).json({message:"User Doesn't exist"})
    const pass = await bcrypt.compare(password, existUser.password);
  if(!pass) return res.status(401).json({message:"invalid credentials"})

    const token = jwt.sign(
      {id: existUser._id, email:existUser.email }, process.env.JWT_SECRET
    )
  
res.cookie("token", token,{
  httpOnly:true,
  secure:process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
})

} catch (error) {
    console.error("error during loggin", error)
   }
}


// Logout Controller



export const Logout = async (req,res)=>{
     
    res.cookie("token", "",{
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
    } );

}


//Get my user Controller

export const myUser = async (req,res)=>{
  res.json(req.user);
}

export const allUsers = async (req,res)=>{
  const alluser = await User.find({
    _id:{ $ne : req.user._id},
  }).select("-password")
  res.json(alluser);
}