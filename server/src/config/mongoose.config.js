const mongoose=require("mongoose");
module.exports=mongoose.connect('mongodb://database/webrtcConnect').then(()=>{
    console.log("db connected Successfully");
}).catch(err=>{
    console.log(err);
})