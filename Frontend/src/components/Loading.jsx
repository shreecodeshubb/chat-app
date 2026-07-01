import loading from '../assets/loading.gif'
function Loading() {
  return (
    <div style={{height:"100vh", width:"100vw", display:"flex", justifyContent:"center", alignItems:"center"}}>

        <div style={{height:"40vh", width:"70vw"}}><video src={loading}></video></div>
    </div>
  )
}

export default Loading