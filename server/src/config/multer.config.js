require("dotenv").config();
const multer=require('multer');
const fs=require("fs");
const path=require('path');
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const { id } = req.userInfo;
      try {
        const uploadPath=path.join('uploads',id);
        req.fileInfo={path:uploadPath}
        if(!fs.existsSync(uploadPath)){
            fs.mkdir(uploadPath,(err)=>{
                if(err){
                    cb(err,uploadPath)
                }
                else{
                    cb(null,uploadPath)
                }
            })
        }
        else{
            cb(null,uploadPath);
        }
    
    } catch (err) {
        cb(err, null);
      }
    },
    filename: (req, file, cb) => {
      req.fileInfo={...req.fileInfo,fileName:file.originalname}
      cb(null, file.originalname);
    },
  });
const upload=multer({storage:storage});
module.exports=upload;