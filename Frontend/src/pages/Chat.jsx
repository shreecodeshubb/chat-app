import { useEffect, useContext } from "react"
import "./Chat.css"
import {socket} from "../Socket.js"
import { UserContext } from "../context/userContext.jsx"

function Chat() {

const {User} = useContext(UserContext);


  useEffect(()=>{

    if(!User) return;


    socket.connect();


    socket.on("connect", ()=>{
      console.log("socket connected!")
    })
    return ()=>{
      socket.disconnect();
    };
  },[User])

  return (
    <div style={{display:"flex", height:"100vh", backgroundColor:"lightgray"}}>
        <div className='left-bar'>
        

        </div>
        <div className='right-bar'></div>
    </div>
  )
}

export default Chat