import express from 'express';
import {Register, Login, Logout, myUser, allUsers} from "../controllers/authController.js";
import { protectHandler } from '../middleware/protected.js';

const router = express.Router();


//POST ROUTES 

router.post("/register", Register );
router.post ("/login", Login);
router.post ("/logout", Logout);



//GET ROUTES

router.get("/myUser", protectHandler, myUser,);
router.get("/allUsers", protectHandler, allUsers )



export default router;

