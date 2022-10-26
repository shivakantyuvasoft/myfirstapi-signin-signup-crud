const express = require('express');
const studentRouter = require("./api/Router/student");
const userRouter = require("./api/Router/User");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 7777;
dotenv.config();


// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: "true",
// })
// mongoose.connection.on("error", err => {
//   console.log("err", err)
// })
// mongoose.connection.on("connected", (err, res) => {
//   console.log("mongoose is connected")
// })


// connect mongo db atlas
mongoose.connect(process.env.MONGO_URL,{usenewurlparser:true,}).then(()=>{
    console.log("connected to mongodb atlas")
}).catch(error=>{
console.log("something wrong")
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use("/student",studentRouter);
app.use("/user",userRouter)
app.use(cors());
app.use((req,res,next)=>{
    res.status(404).json({
        error:"bad request"
    })
})

app.listen(PORT, () => {
    console.log("Server is running at port 7777");
  });

