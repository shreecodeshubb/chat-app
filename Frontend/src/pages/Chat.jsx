import { useEffect, useContext, useState } from "react"
import "./Chat.css"
import { socket } from "../Socket.js"
import { UserContext } from "../context/context.js"
import img from '../assets/img_avatar.png'
import chatlogo from '../assets/chat.png'
import more from '../assets/more.png'
import send from '../assets/send.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Chat() {
const navigate = useNavigate();
  const { user, setUser,allUser } = useContext(UserContext);
  const [searchOpen,setSearchOpen] = useState(false);
  const [moremenu, setMoremenu] = useState(false);
  const [selectUser, setSelectuser] = useState(null);
  const [delMenu, setDelMenu] = useState(false);

  
  // message state -----------
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  

const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/logout",
      {},
      {
        withCredentials: true, 
      }
    );

    socket.disconnect(); 

    setUser(null); 

    navigate("/login"); 
    toast.success("Logout successfully")
  } catch (err) {
    console.log("Logout error:", err);
  }
};

const handleEdit = ()=>{
  navigate("/edit")
}


  useEffect(() => {

    if (!user) return;


    socket.connect();


    socket.on("connect", () => {
      console.log("socket connected!")
    })


    
      socket.on("recieveMsg", (msg) =>{
        setMessages(prev =>[...prev, msg]);
      })

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });
    return () => {
      socket.off("connect")
      socket.disconnect();
    };
  }, [user])

useEffect(()=>{
  if(!selectUser) return;
  
  loadMessage();

},[selectUser])



const sendMsg = ()=>{

  if(!message.trim() || !selectUser) return;
  socket.emit("send", {
    recieverId : selectUser._id,
    text:message
  } );
  setMessage("")
}

const loadMessage = async ()=>{
  const res = await axios.get(`http://localhost:3000/api/messages/${selectUser._id}`, {
    withCredentials:true
  });

  setMessages(res.data);

}


const deleteMsg = async ()=>{
   const res =   await axios.delete(`http://localhost:3000/api/messages/${selectUser._id}`, {
    withCredentials:true
   });

   console.log(res.data);

   setMessages([]);

  // console.log("delete msg")
}




  return (
    <div className="main">

      <div className="container">
        <div className='left-bar'>
          {!searchOpen?(
            <><div className="logo"> <img src={chatlogo} alt="" />
            
          
        <input
  className="search"
  type="text"
  placeholder="Search"
  onClick={() => setSearchOpen(true)}
  readOnly
/>      

           </div>
          {/* individual users */}
          
           {allUser?.map((users)=>
            (<div className="user" key={users._id} onClick={()=> setSelectuser(users)}>
            <div className="dp"><img src={users.avatar? `http://localhost:3000/upload/${users.avatar}`: img} alt="DP" /></div>
            <div> <h4>{users.name}</h4>
              <p >Hi How are you</p>
            </div>
            <div><h3 style={{backgroundColor:"#e0e6e0", borderRadius:"55%"}}>2</h3>
              <span>Now</span>
            </div>

          </div>))}
          
          
          </>
          ):(
           <div className="search-page">

      <div className="search-header">

        <button
          className="back-btn"
          onClick={() => setSearchOpen(false)}
        >
          ←
        </button>

        <input
          className="search"
          type="text"
          placeholder="Search users..."
          autoFocus
            onClick={() => setSearchOpen(true)}

        />
      </div>

      <div className="search-results">
        {/* Search Results Here */}
      </div>

    </div>
          )}
     
     
          
        </div>
        <div className='right-bar'>


          {selectUser? ( <><div className="user-info"> <div className="info-img"><img src={`http://localhost:3000/upload/${selectUser.avatar}`} alt="" /> </div> 
              <h3>{selectUser.name}</h3>
              <div className="del" onClick={()=> setDelMenu(!delMenu)}> <img src={more} alt="more" /></div>
       {delMenu&&(
        <div className="clear-div" onClick={deleteMsg} >
  
      <p  >Clear Message</p>
   

  </div>
       )}

              <div></div>
           </div>

            <div className="messeges">
               {messages.map((msg)=>(

           <div key={msg._id}
           className={
            msg.sender === user._id ? "send":"recieve"
           }
           
           > 
            <h4>{msg.text}</h4>
            
             </div>

               ))}
              


           </div>
           <div className="text-bar">
            <input 
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            type="text" />
            <button type="submit" className="button" onClick={sendMsg}><img src={send}alt="" /></button>
           </div>
           </>
          ): (   
           <div className="user-info"><div className="info-img"><img src={user.avatar? `http://localhost:3000/upload/${user.avatar}`: img} alt="dp" /> </div>
              <h3>no user</h3>
           </div>)}
             
       

        </div>
        <div className="info">
       <div className="more" onClick={()=> setMoremenu(!moremenu)}> <img src={more} alt="more" /></div>
       {moremenu&&(
        <div className="menudiv">
    <div className="menu-item">
      <p onClick={handleEdit} >Edit</p>
    </div>

    <div className="menu-item">
      <p onClick={handleLogout}>Logout</p>
    </div>
  </div>
       )}
       
       
       <div className="heading"> <h3>Profile</h3> </div>
       <div className="profile-pic"> <img src={user.avatar? `http://localhost:3000/upload/${user.avatar}`: img} alt="dp" /></div>
       <div className="infos"> 
        <div className="name"> <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center" }}>  <i className="fi fi-rr-user"> Name</i> </div>
        <div> <h4>{user.name}</h4></div> 
        
        </div>
       <div className="about"> <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", gap:"5px" }}> <i className="fi fi-rr-info"></i> <p>Bio</p> </div> 
       
       <div><h4>{user.bio}</h4></div>
       </div>
       <div className="email"> <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", gap:"5px" }}><i className="fi fi-rr-"></i> <p>Email</p></div>
       
       <div><h4>{user.email}</h4></div>
        </div>
        </div>

        </div>
      </div>
    </div>
  )
}

export default Chat