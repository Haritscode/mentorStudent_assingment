const ErrorHandler = require("../config/ErrorHandler.config");
const userData=(req,res,next)=>{
    try{
        const {email,name}=req.userInfo;
        res.status(200).json({email,name});
    }
    catch(err){
        next(new ErrorHandler())
    };
}
module.exports=userData;
