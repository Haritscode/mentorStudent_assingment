require("dotenv").config();
const jwt=require("jsonwebtoken");
const ErrorHandler = require("../config/ErrorHandler.config");
const tokenGenerator=(req,res,next)=>{
    try{
        const {email,id,name}=req.userInfo;
        const rtoken=jwt.sign({id},process.env.REFRESH_TOKEN,{expiresIn:'30d'})
        const atoken=jwt.sign({id,email},process.env.ACCESS_TOKEN,{expiresIn:'6h'})
        res.cookie("rtk",`Bearer ${rtoken}`,{maxAge:1000*60*60*24*30})
        res.cookie("atk",`Bearer ${atoken}`,{maxAge:1000*60*60*6})
        next();
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=tokenGenerator;