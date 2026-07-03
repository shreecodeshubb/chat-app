import { useEffect, useContext, useState } from "react"
import "./Chat.css"
import { socket } from "../Socket.js"
import { UserContext } from "../context/context.js"
import img from '../assets/img_avatar.png'
import chatlogo from '../assets/chat.png'
import send from '../assets/send.png'
function Chat() {

  const { user } = useContext(UserContext);
  const [searchOpen,setSearchOpen] = useState(false);

  useEffect(() => {

    if (!user) return;


    socket.connect();


    socket.on("connect", () => {
      console.log("socket connected!")
    })


    socket.emit('send', {
      message: "new message from cilent"
    })

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });
    return () => {
      socket.off("connect")
      socket.disconnect();
    };
  }, [user])

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

          <div className="user">
            <div className="dp"><img src={img} alt="DP" /></div>
            <div> <h4>Puja Dey</h4>
              <p >Hi How are you</p>
            </div>
            <div><h3 style={{backgroundColor:"#e0e6e0", borderRadius:"55%"}}>2</h3>
              <span>Now</span>
            </div>

          </div></>
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
             
           <div className="user-info"><img src={img} alt="" />
              <h3>Puja Dey</h3>
           </div>
           <div className="messeges">
              
           <div className="send">  <h4>nhdkjcbdajhc hjdscgsdhv hjadsgadjgfah</h4></div>
           <div className="recieve">    <h4>bcvhfsdhgs jhsdgdhssdhg dfdhfgdhfgdfg</h4></div>


           </div>
           <div className="text-bar">
            <input type="text" />
            <button className="button"><img src={send}alt="" /></button>
           </div>

        </div>
        <div className="info">
       <div className="heading"> <h3>Profile</h3></div>
       <div className="profile-pic"> <img src={img} alt="dp" /></div>
       <div className="infos"> 
        <div className="name"> <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center" }}>  <i className="fi fi-rr-user"> Name</i> </div>
        <div> <h4>Puja Dey</h4></div> 
        
        </div>
       <div className="about"> <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", gap:"5px" }}> <i className="fi fi-rr-info"></i> <p>Bio</p> </div> 
       
       <div><h4>this is my bio</h4></div>
       </div>
       <div className="email"> <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", gap:"5px" }}><i className="fi fi-rr-id card"></i> <p>Email</p></div>
       
       <div><h4>pdey8589@gmail.com</h4></div>
        </div>
        </div>


        </div>
      </div>
    </div>
  )
}

export default Chat