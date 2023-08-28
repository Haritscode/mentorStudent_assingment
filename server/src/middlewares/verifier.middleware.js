require("dotenv").config();
const jwt=require("jsonwebtoken");
const userdb=require('../model/User.model')
const ErrorHandler = require("../config/ErrorHandler.config");
const verifier=(req,res,next)=>{
    try{
        let {rtk,atk}=req.cookies;
        rtk=rtk?.split(" ")[1];
        atk=atk?.split(" ")[1];
        if(atk){
            jwt.verify(atk,process.env.ACCESS_TOKEN,(err,decoded)=>{
                if(err){
                    next(new ErrorHandler("Unauthorize User",401));
                }
                else{
                    const {id,email}=decoded;
                    req.userInfo={id,email};
                    next();
                }
            })
        }
        else if(!atk && rtk){
            jwt.verify(rtk,process.env.REFRESH_TOKEN,async(err,decoded)=>{
                if(err){
                    next(new ErrorHandler("Unauthorized User",401))
                }
                else{
                    const result=await userdb.findById(decoded.id);
                    const {email,id}=result
                    const atoken=jwt.sign({email,id},process.env.ACCESS_TOKEN,{expiresIn:'6h'});
                    res.cookie("atk",`Bearer ${atoken}`,{maxAge:1000*60*60*6})
                    req.userInfo={id,email}
                    next()
                }
            })
        }
        else if(!rtk && !atk){
            next(new ErrorHandler("Unauthorized User",401));
        }
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=verifier;