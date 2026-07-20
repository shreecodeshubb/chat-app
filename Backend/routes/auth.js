import express from 'express';
import {Register, Login, Logout, myUser, allUsers, fetchMSg, deleteMsg, editProfile, deleteUser} from "../controllers/authController.js";
import { protectHandler } from '../middleware/protected.js';
import upload from '../middleware/multer.js';


const router = express.Router();


//POST ROUTES 

router.post("/register",  Register );
router.post ("/login", Login);
router.post ("/logout", Logout);



//GET ROUTES

router.get("/myUser", protectHandler, myUser,);
router.get("/allUsers", protectHandler, allUsers )
router.get("/messages/:userid", protectHandler, fetchMSg)



//DELETE ROUTE

router.delete("/messages/:userid", protectHandler, deleteMsg );
router.delete("/profile/delete", protectHandler,deleteUser ) ;

export default router;

//EDIT ROUTE

router.put("/profile/edit", protectHandler, upload.single("avatar"), editProfile);