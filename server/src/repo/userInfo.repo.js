const ErrorHandler = require('../config/ErrorHandler.config');
const userdb=require('../model/User.model');
const userInfo=async(req,res,next)=>{
    try{
        const {email,id}=req.userInfo;
        const data=await userdb.findById(id,{_id:0,email:1,name:1})
        res.status(200).json(data)
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=userInfo;