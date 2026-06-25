import { useEffect, useContext } from "react"
import "./Chat.css"
import {socket} from "../Socket.js"
import { UserContext } from "../context/context.js"

function Chat() {

const {user} = useContext(UserContext);


  useEffect(()=>{

    if(!user) return;


    socket.connect();


    socket.on("connect", ()=>{
      console.log("socket connected!")
    })


    socket.emit('send', {
      message:"new message from cilent"
    })

    socket.on("connect_error", (err) => {
  console.log("Socket connection error:", err.message);
});
    return ()=>{
      socket.off("connect")
      socket.disconnect();
    };
  },[user])

  return (
    <div style={{display:"flex", height:"100vh", backgroundColor:"lightgray"}}>
        <div className='left-bar'>
        

        </div>
        <div className='right-bar'></div>
    </div>
  )
}

export default Chat