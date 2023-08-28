const ErrorHandler = require("../config/ErrorHandler.config");
const uploadRecording=(req,res,next)=>{
    try{
        res.status(200).send({msg:"upload Successfull"})
    }
    catch(err){
        next(new ErrorHandler())
    }
}
module.exports=uploadRecording;