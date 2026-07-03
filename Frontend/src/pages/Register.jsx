import { useState, useContext } from "react"
import { UserContext } from "../../src/context/context.js"
import { Link, useNavigate } from "react-router-dom"
import bg from "../assets/auth-bg.webp"
import chatbg from "../assets/chat.png"
import axios from "axios";
import CustomError from "../components/CustomError.jsx";
import Loading from "../components/Loading.jsx"
function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const [cuser, setCuser] = useState({ name:"", email:"", password:""});
const [error, setError] = useState(false);

const {setUser} = useContext(UserContext);
const handleChange = (e)=>{
  const {name, value} = e.target;
  setCuser((prev)=>({
    ...prev,
    [name]:value
  }))
}

const handleSubmit = async(e) =>{
  e.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:3000/api/register", cuser,
      {
      withCredentials:true,
    })
    console.log(res.data);
    setUser(res.data.user)
    navigate("/chat");
    setError(false);
   
  } catch (error) {
    console.log("Error while Registration", error)
     setError(true) 
     setLoading(false)
  }
}


if (error) return  <CustomError/>
if (loading) return <Loading/>


  return (
    <div style={{height:"100vh", width:"100%",  display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"4rem", backgroundImage:`url(${bg})`, backgroundPosition:"center", backgroundSize:"cover"}}>
      
      <h1 style={{fontFamily:"sans-serif", color:"#232726",fontWeight:"400"}}>SIGN UP & CONNECT WITH PEOPLE  💻</h1>
<div style={{height:"75vh", width:"70vw", display:"flex", justifyContent:"space-evenly", alignItems:"center", backgroundColor:"#ffffff9a"}}>
<div style={{height:"40vh" }}><img src={chatbg} style={{objectFit:"cover", height:"100%", backgroundSize:"cover", backgroundPosition:"center", borderRadius:"20px",}} /></div>

   <form onSubmit={handleSubmit} style={{height:"80%", width:"50%", display:"flex", justifyContent:"center", flexDirection:"column", backgroundColor:"rgba(239, 247, 247, 0.68)", alignItems:"center", gap:"30px", borderRadius:"20px"}}>
    <input onChange={handleChange} style={{padding:"0.6rem 0.7rem", width:"280px", fontSize:"18px", outline:"0.2px solid #000", boxShadow:"2px 5px 5px #000", borderRadius:"10px" , backgroundColor:"#e4dadae0" , border:"none"}} type="text"   placeholder='Name' name="name"/>
     <input onChange={handleChange} style={{padding:"0.6rem 0.7rem", width:"280px", fontSize:"18px", outline:"0.2px solid #000", boxShadow:"2px 5px 5px #000", borderRadius:"10px", backgroundColor:"#e4dadae0", border:"none"}} type="email"  placeholder='Email' name="email"/>
      <input onChange={handleChange} style={{padding:"0.6rem 0.7rem", width:"280px", fontSize:"18px", outline:"0.2px solid #000", boxShadow:"2px 5px 5px #000", borderRadius:"10px", backgroundColor:"#e4dadae0", border:"none"}} type="password"  placeholder='Password' name="password"/>
      <button style={{padding:"0.7rem 7rem", borderRadius:"18px", backgroundColor:"#8a90cc" }}>Submit</button>
  
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