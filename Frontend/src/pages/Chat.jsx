import { useEffect, useContext } from "react"
import "./Chat.css"
import { socket } from "../Socket.js"
import { UserContext } from "../context/context.js"
import img from '../assets/img_avatar.png'
import chatlogo from '../assets/chat.png'
import send from '../assets/send.png'
function Chat() {

  const { user } = useContext(UserContext);


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

          <div className="logo"> <img src={chatlogo} alt="" />
          
          <input className="search" type="text"  placeholder="Search" />
           
          
           </div>
          {/* individual users */}

          <div className="user">
            <div className="dp"><img src={img} alt="DP" /></div>
            <div> <h3>Puja Dey</h3>
              <p >Hi How are you</p>
            </div>
            <div><h3>2</h3>
              <span>Now</span>
            </div>

          </div>
        </div>
        <div className='right-bar'>
             
           <div className="user-info"><img src={img} alt="" />
              <h3>Puja Dey</h3>
           </div>
           <div className="messeges">

           </div>
           <div className="text-bar">
            <input type="text" />
            <button className="button"><img src={send}alt="" /></button>
           </div>

        </div>
        <div className="info"></div>
      </div>
    </div>
  )
}

export default Chat