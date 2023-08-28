const userdb=require("../model/User.model");
const ErrorHandler=require("../config/ErrorHandler.config");
const user=async(req,res,next)=>{
    try{

        const {name,email}=req.body;
        let result=await userdb.findOne({email});
        if(result)
        {
            if(result.name===name){
                const {id,email,name}=result;
                req.userInfo={id,email,name};
            }
            else{
                next(new ErrorHandler("Invalid Credentials",400))
            }
        }
        else{
            result=new userdb({name,email})
            result=await result.save();
            const {id,email,name}=result;
            res.userInfo={id,email,name};
        }
        next();
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=user;