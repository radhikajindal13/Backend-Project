// Multer saves the file temporarily in ./public/temp.
// Cloudinary picks that file from local storage and uploads it to the cloud.
// After successful upload, you usually delete the temp file (optional).

import multer from "multer";
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/temp')
    },
    filename: function(req,file,cb){
        // const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})
export {upload}