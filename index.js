const express=require('express');
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const PORT=process.env.PORT || 2000
const URI=process.env.URI

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
const userRouter=require('./routes/user.route');
app.use('/users',userRouter)

mongoose.connect("mongodb+srv://Stevo2202:68225901@cluster0.dgi9f6m.mongodb.net/virtual_db?retryWrites=true&w=majority",(err)=>{
if (err) {
    console.log("Mongoose could not connect");
}else{
    console.log("Mongoose has connected successfully");
}
})

const connection=app.listen(PORT,()=>{
console.log(`App is listening at port ${PORT}`);
})
const socketio=require('socket.io')
const io=socketio(connection,{cors:{options:"*"}})
io.on('connection',(socket)=>{
console.log("A user has connected");
console.log(socket.id);
socket.on("newMessage",(message)=>{
console.log(message);
io.emit("recievedMessage",message)
})
})