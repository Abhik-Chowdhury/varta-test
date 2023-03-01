const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
const mongoose = require("mongoose");


const app = express();
require("dotenv").config();
app.use(cors())
app.use(express.json());

app.use("/api/auth",userRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`DB Connect Successfull:${mongoose.connection.host}`)
}).catch((err)=>{
    console.log(err.message)
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started on PORT ${process.env.PORT}`)
})
