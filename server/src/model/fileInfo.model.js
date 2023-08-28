const mongoose=require('mongoose');
const fileInfo=new mongoose.Schema({
    recordings:{type:[{
            filePath:{type:String,required:true},
            fileName:{type:String,required:true},
            createdAt:{type:Date,required:true,default:Date.now},
            createdTimeStamp:{type:Number,required:true,default:Date.now()}
        }],
        required:true
    },
    uploadedBy:{type:String,required:true}
})
module.exports=mongoose.model("fileDetail",fileInfo);