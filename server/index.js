require('dotenv').config();
require("./src/config/mongoose.config");
const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser=require("cookie-parser");
const errorHandler = require('./src/middlewares/errorHandler.middleware');
const userInfo = require('./src/repo/userInfo.repo');
const port=process.env.PORT || 4000;
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json())
app.use('/auth',require("./src/routes/auth.routes"));
app.use(require("./src/middlewares/verifier.middleware"));
app.get("/check/auth",userInfo);
app.use("/uploadFile",require('./src/routes/recording.routes'));
app.use(errorHandler)
app.listen(port,(req,res)=>{
    console.log(`server running at port ${port}`);
})