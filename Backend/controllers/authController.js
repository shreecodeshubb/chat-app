import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import Message from "../models/message.js";



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
        return res.status(200).json({
      success:true,
      message:"Registered successful",
      user:{
        id: user._id,
        email: user.email,
      }
    });
       


    } catch (error) {
        console.error("Error while user Registration", error)
         return res.status(500).json({
          success:false,
          message:error.message
         })
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
  sameSite:"lax"
})

    return res.status(200).json({
      success:true,
      message:"Login successful",
      user:{
        id: existUser._id,
        email: existUser.email,
        name: existUser.name

      }
    });


} catch (error) {
    console.error("error during loggin", error)
    return res.status(500).json({
          success:false,
          message:error.message
         })
   }
}


// Logout Controller



export const Logout = async (req,res)=>{
     
    res.cookie("token", "",{
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(),
      sameSite: "lax"
    } );

    res.status(200).json({
      success:true,
      message:"Successfully Logout"
    })

}


//Get my user Controller

export const myUser = async (req,res)=>{
  console.log("user info ", req.user)
  res.json(req.user);
}

export const allUsers = async (req,res)=>{
  const alluser = await User.find({
    _id:{ $ne : req.user._id},
  }).select("-password")
  res.json(alluser);
}


//      MESSAGE CONTROLLER   //

//get messeges....

export const fetchMSg = async (req,res)=>{
 
const senderid = req.user.id;
const recieverId = req.params.userid;

const messages = await Message.find({
  $or:[{
    sender: senderid,
    receiver:recieverId
  }, {
    sender: recieverId,
    receiver: senderid
  }]
}).sort({createdAt:1})


   
res.json(messages);

}


//delete messeges....


export const deleteMsg = async (req, res)=>{
    const senderid = req.user.id;
    const recieverid = req.params.userid;  


   await Message.deleteMany({
    $or: [{
      sender: senderid,
      receiver: recieverid
    },
  {
    sender: recieverid,
    receiver: senderid
  }]
   })

   res.json({success:true, messege:"Cleared successfully!"})

}

//DELETE USER CONTROLLER

export const deleteUser = async (req,res)=>{


  try {
    const userid = req.user.id;
  
  await User.findByIdAndDelete(userid);
  res.clearCookie("token");

  return res.status(200).json({
    success:true,
    message:"Account Deleted Successfully"
  })
  } catch (error) {
     console.log("Error while deleting the user")
  }

}



//EDIT CONTROLLER

export const editProfile = async (req,res) =>{
    
   const id = req.user.id;

   const user = await User.findByIdAndUpdate( id, {
         avatar: req.file?.filename,
            bio: req.body.bio,
            name: req.body.name,
   },
  {
    returnDocument:true
  })
 
  res.json(user)

}