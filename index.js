import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {Server} from 'socket.io';
import http from 'http';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();


app.use(express.json());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(cors());

app.use('/auth',authRoutes)

const server = http.createServer(app);

const io = new Server(server, {
     cors: {
        origin: '*',
        method: ['GET', 'POST', 'PUT', 'DELETE']
     }
});


// socket connection
io.on("connection",(socket)=>{
    console.log("User connected");

    roomHandler(socket);

    socket.on("disconnetion",()=>{
        console.log("User disconnected");
    })

})


const PORT = process.env.PORT||6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopoligy: true
}).then(()=>{


    server.listen(PORT,()=>{
        console.log(`Running @ ${PORT}`);
    });


}).catch((err)=>{
    console.log("Error: ",err);
})