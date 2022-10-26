const express = require('express');
const studentRouter = require("./api/Router/student");
const userRouter = require("./api/Router/User");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();


mongoose.connect('mongodb+srv://admin:admin123@mydb.evivghv.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on("error",err=>{
    console.log("Connection Failed");
})

mongoose.connection.on("connected",connected=>{
    console.log("connected")
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/student",studentRouter);
app.use("/user",userRouter)
app.use(cors());
app.use((req,res,next)=>{
    res.status(404).json({
        error:"bad request"
    })
})

module.exports = app;

