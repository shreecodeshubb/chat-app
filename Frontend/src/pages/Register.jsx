import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import bg from "../assets/auth-bg.webp"
import chatbg from "../assets/Chat-bg.jpg"
import axios from "axios";
import CustomError from "../components/CustomError.jsx";

function Register() {

  const navigate = useNavigate();
const [user, setUser] = useState({ name:"", email:"", password:""});
const [error, setError] = useState(false);
const handleChange = (e)=>{
  const {name, value} = e.target;
  setUser((prev)=>({
    ...prev,
    [name]:value
  }))
}

const handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/api/register", user,
      {
      withCredentials:true,
    })
    console.log(res.data)
    navigate("/chat")
    setUser({name:"",email:"",password:""})
    setError(false)
  } catch (error) {
    console.log("Error while Registration", error)
     setError(true) 
  }
}


if (error) return  <CustomError/>


  return (
    <div style={{height:"100vh", width:"100%",  display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"4rem", backgroundImage:`url(${bg})`, backgroundPosition:"center", backgroundSize:"cover"}}>
      
      <h1 style={{fontFamily:"sans-serif", color:"#232726",fontWeight:"400"}}>SIGN UP & CONNECT WITH PEOPLE  💻</h1>
<div style={{height:"80vh", width:"70vw", display:"flex", justifyContent:"space-evenly", alignItems:"center", backgroundColor:"#ffffff9a"}}>
<div style={{height:"70vh" }}><img src={chatbg} style={{objectFit:"cover", height:"100%", backgroundSize:"cover", backgroundPosition:"center", borderRadius:"20px",}} /></div>

   <form onSubmit={handleSubmit} style={{height:"70%", width:"50%", display:"flex", justifyContent:"center", flexDirection:"column", backgroundColor:"rgba(239, 247, 247, 0.68)", alignItems:"center", gap:"30px", borderRadius:"20px"}}>
    <input onChange={handleChange} style={{padding:"0.7rem 0.7rem", width:"280px", fontSize:"18px", outline:"0.2px solid #000", boxShadow:"2px 5px 5px #000", borderRadius:"10px" , backgroundColor:"#e4dadae0" , border:"none"}} type="text"   placeholder='Name' name="name"/>
     <input onChange={handleChange} style={{padding:"0.7rem 0.7rem", width:"280px", fontSize:"18px", outline:"0.2px solid #000", boxShadow:"2px 5px 5px #000", borderRadius:"10px", backgroundColor:"#e4dadae0", border:"none"}} type="email"  placeholder='Email' name="email"/>
      <input onChange={handleChange} style={{padding:"0.7rem 0.7rem", width:"280px", fontSize:"18px", outline:"0.2px solid #000", boxShadow:"2px 5px 5px #000", borderRadius:"10px", backgroundColor:"#e4dadae0", border:"none"}} type="password"  placeholder='Password' name="password"/>
      <button style={{padding:"0.8rem 7rem", borderRadius:"18px", backgroundColor:"#8a90cc" }}>Submit</button>
  
   <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px", flexDirection:"column",}}>
        <p style={{color:"#584c4c"}}>Already have an account?</p>
        <Link style={{color:"#9b4141"}} to="/login"> Login Here </Link>
       </div>
   </form>
   </div>
    </div>
  )

}

export default Register