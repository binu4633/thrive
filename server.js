import path from 'path';
import express from "express";
import { Server } from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import connectDB from "./backend/db/db.js";
import workerRoute from './backend/routes/workerRoutes.js';
import adminRoute from './backend/routes/adminWorkersRoute.js' ;
import userRoute from './backend/routes/userRoutes.js' ;


dotenv.config();
const app = express();
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        // origin: "http://localhost:3000"
        origin: "https://thrive-1bmi.onrender.com",
        credentials: true
      }
});
connectDB();  

app.use(express.json({ limit: "150mb" }));

app.use('/api/v1/worker',workerRoute);
app.use('/api/v1/admin',adminRoute);
app.use('/api/v1/user',userRoute);

const __dirname = path.resolve()

if(process.env.NODE_ENV ==='production'){
  app.use(express.static(path.join(__dirname,'frontend/build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}

export const getIo = ()=>io

const PORT = process.env.PORT || 5000;
io.on('connection',(socket)=>{
    io.emit('takeMag','the welcome message is on')
})

server.listen(PORT, () => {
  console.log(
    `app listeing port ${PORT} and running `
  );
});
