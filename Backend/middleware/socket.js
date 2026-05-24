
export const socketMiddleware = (io)=>{
      
    io.use((socket,next)=>{
        try {
            const cookies = cookie.parse(socket.handshake.headers.cookie || "");
            const token = cookies.token;


            if(!token){
                return next(new Error("Socket auth error"));
            }

            const decode = jwt.verify(token, "JWT_SECRET");
            socket.user = decode;
            next()
        } catch (error) {
            next(new Error("auth failed in socket middleware"))
        }
    })
}