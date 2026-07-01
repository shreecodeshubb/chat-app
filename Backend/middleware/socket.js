
import cookie from 'cookie';
import jwt from 'jsonwebtoken';


export const socketMiddleware = (io)=>{
      
    io.use((socket,next)=>{
        try {
             console.log("Cookie Header:", socket.handshake.headers.cookie);
            const cookies = cookie.parse(socket.handshake.headers.cookie || "");
            const token = cookies.token;


            if(!token){
                return next(new Error("Socket auth error"));
            }

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decode;
            next()
        } catch (error) {
            next(new Error("auth failed in socket middleware"))
            console.log(error)
          
    next(error);

        }
    })
}