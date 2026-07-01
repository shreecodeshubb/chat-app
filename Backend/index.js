import express from 'express'; 
import http from 'http'; 
import { Server } from 'socket.io'; 
import authRoute from "./routes/auth.js"
import { configDb } from './models/dbConfig.js';
import { socketMiddleware } from './middleware/socket.js';
import cors from 'cors';


import "dotenv/config";
import cookieParser from 'cookie-parser';
const PORT = Number(process.env.PORT) || 3000;


const app = express();
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true,
}))
const server = http.createServer(app);
const io = new Server (server, {
 cors:{
    origin:"http://localhost:5173",
    credentials:true,
 }
});

socketMiddleware(io);


io.on("connection", (socket)=>{
     console.log("connected to socket ", socket.id)
     socket.on("send",(msg)=>{
        console.log("message recieved", msg)
     })
})


app.use(express.json());
app.use(cookieParser());


app.use("/api", authRoute );



const connectServer=async()=>{

await configDb()
server.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`)
});

}


connectServer();

