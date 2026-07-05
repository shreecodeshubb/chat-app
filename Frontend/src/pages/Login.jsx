import bg from "../assets/auth-bg.webp"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import CustomError from "../components/CustomError.jsx";
import chatbg from "../assets/chat.png"
import { UserContext } from "../../src/context/context.js";
import { useContext } from "react";
import { toast } from "react-toastify";



function Login() {
const navigate = useNavigate();
const [cuser, setcUser] = useState({email:"",password:""})
const [error, setError] = useState(false);

const {setUser} =  useContext(UserContext);

const handleChange=(e) =>{
 const {name,value} = e.target;
 setcUser((prev)=>({
  ...prev,
  [name]:value
 }))
}

const handleSubmit = async(e) =>{
     e.preventDefault();
     try {
      const res = await axios.post("http://localhost:3000/api/login", cuser, {withCredentials:true});
      console.log("login user", res.data);
      setUser(res.data.user)
      navigate("/chat");
      toast.success("Login successfully")

       setError(false);
     } catch (error) {
      console.log("error while login", error);
      setError(true);
     }
}

{error && <CustomError/>}




  return (
    <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "4rem", backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "cover" }}>

     <h1 style={{fontFamily:"sans-serif", color:"#232726",fontWeight:"400"}}>LOGIN & RESTART YOUR CONVO  💻</h1>
     <div style={{height:"75vh", width:"70vw", display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
     <div style={{height:"40vh" }}><img src={chatbg} style={{objectFit:"cover", height:"100%", backgroundSize:"cover", backgroundPosition:"center", borderRadius:"20px",}} /></div>
      <form onSubmit={handleSubmit} style={{ height: "75%", width: "50%", display: "flex", justifyContent: "center", flexDirection: "column", backgroundColor: "rgba(239, 247, 247, 0.68)", alignItems: "center", gap: "30px", borderRadius: "20px" }}>
        <input  onChange={handleChange} style={{ padding: "1rem 0.9rem", width: "280px", fontSize: "18px", outline: "0.2px solid #000", boxShadow: "2px 5px 5px #000", borderRadius: "10px", backgroundColor: "#e4dadae0", border: "none" }} value={cuser.email ?? ""}  type="email" placeholder='Email'name="email" />
        <input onChange={handleChange}style={{ padding: "1rem 0.9rem", width: "280px", fontSize: "18px", outline: "0.2px solid #000", boxShadow: "2px 5px 5px #000", borderRadius: "10px", backgroundColor: "#e4dadae0", border: "none" }} value={cuser.password ?? ""} type="password" placeholder='Password' name="password" />
        <button type="submit" style={{ padding: "0.8rem 7rem", borderRadius: "18px", backgroundColor: "#8a90cc" }}>Submit</button>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexDirection: "column", }}>
          <p style={{ color: "#584c4c" }}>Don't have an account?</p>
          <Link style={{ color: "#9b4141" }} to="/"> Register Here </Link>
        </div>

      </form>
</div>
    </div>
  )
}

export default Login