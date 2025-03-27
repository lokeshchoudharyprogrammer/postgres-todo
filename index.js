const express =require("express");
const cors =require("cors");
const todoRouter = require("./router/todo");


const server=express();

server.use(express.json())
server.use(cors());

server.get("/",(req,res)=>{
    res.json({
        server:"started"
    })
})



server.use("/todos",todoRouter);

server.listen(4000,()=>{
    console.log("server has been started");
})