const {Router}=require("express");
const fileData=require("../repo/fileData");
const uploadRecording = require("../controller/uploadRecoding.middleware");
const uploadFile=require("../config/multer.config");
const routes=Router();
routes.post("/",uploadFile.any(),fileData,uploadRecording)
module.exports=routes;