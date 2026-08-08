import "./profile.css"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/context.js";



function ProfileEdit() {
  const {setUser,user} = useContext(UserContext);

const [editUser, setEditUser] = useState({name:"", bio:""});
const [avatar, setAvatar] = useState(null);


const deleteUser = async() =>{
const confirmMsg = window.confirm("Are you sure , You want to delete this account!");
if(!confirmMsg) return;


  try {
      const res = await axios.delete("http://localhost:3000/api/profile/delete", {withCredentials:true})
    setUser(null)
    toast.success("account deleted successfully")
    navigate("/")

  } catch (error) {
    
  }
    
}
const handlechange = (e)=>{

const {name,value} = e.target;
setEditUser((prev)=>({...prev,
  [name]:value
}))
}


const handleSubmit = async(e)=>{
  e.preventDefault();
  if(!editUser.name && !editUser.bio && !avatar) {
    return toast.error("Fill the require fields!")
  }

const formData = new FormData();

formData.append("name", editUser.name);
formData.append("bio", editUser.bio);

if(avatar){
formData.append("avatar", avatar);
}
try {

const res = await axios.put("http://localhost:3000/api/profile/edit", formData,{
  withCredentials:true
});
setUser(res.data);
toast.success("Successfully updated");
console.log("edited user res", res.data.avatar);

navigate("/chat")



} catch (error) {
  console.log("error while submit edit")
}
}

    const navigate = useNavigate()
  const backHandler = ()=>{
    navigate("/chat")
  }

  return (
    <div className="profile-main">
    
<h2>Edit your profile</h2>
<div> <button className="back" onClick={backHandler}>← Back</button></div>
<form onSubmit={handleSubmit}>

    <input onChange={handlechange} type="text" value={editUser.name} placeholder='Name'name="name" />
    <input onChange={handlechange} type="text" value={editUser.bio} placeholder='bio' name="bio" />
    <input onChange={(e)=>setAvatar(e.target.files[0])}  type="file" placeholder="Profile" name="avatar"/>
    <div className="btn"><button className="save" > Save</button>
    <button className="del" type="button" onClick={deleteUser} >Delete Account</button></div>
    
</form>
    </div>
  )
}

export default ProfileEdit