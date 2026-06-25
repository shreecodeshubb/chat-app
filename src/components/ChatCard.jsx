import React from 'react'

function ChatCard({name,avatar}) {
  return (
    <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", width:"100%", height:"20px", backgroundColor:"lightblue", padding:"0 5px"}}>
        <img src={avatar} alt="profile" />
          <h2>{name}</h2>
    </div>
  )
}

export default ChatCard