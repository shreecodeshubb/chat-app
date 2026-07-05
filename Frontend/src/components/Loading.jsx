import loading from "../assets/loading.gif";

function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#bdb6b6d2",
        flexDirection:"column"
      }}
    >
      <img
        src={loading}
        alt="Loading..."
        style={{ height: "400px", width: "600px" }}
      />
      <h2 style={{color:"#855f5f"}}>Please wait , We are almost there!</h2>
    </div>
  );
}

export default Loading;