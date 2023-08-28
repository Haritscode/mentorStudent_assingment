const ErrorHandler = require("../config/ErrorHandler.config")
const logoutUser=(req,res,next)=>{
    try{
        res.cookie("atk","",{maxAge:0})
        res.cookie("rtk","",{maxAge:0})
        res.status(200).json({msg:"user logout"})
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=logoutUser