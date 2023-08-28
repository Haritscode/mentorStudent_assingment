const ErrorHandler = require('../config/ErrorHandler.config');
const filedb=require('../model/fileInfo.model');
const fileData=async(req,res,next)=>{
    try{
        const {id,email}=req.userInfo;
        const {path,fileName}=req.fileInfo;
        let result=await filedb.findOneAndUpdate({_id:id},{
            $push:{recordings:{filePath:path,fileName}}
        },{upsert:true,new:true})
        if(result){
            next();
        }
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=fileData;