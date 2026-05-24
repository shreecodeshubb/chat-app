import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const protectHandler = async (req,res,next)=>{

      try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({message:"Unauthorized!"});
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = User.findById(decode.id).select("-password");
        next();

      } catch (error) {
        console.error("invalid token", error);
      }

}