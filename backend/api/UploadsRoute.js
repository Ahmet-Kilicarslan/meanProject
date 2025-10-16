import express from "express";
import {upload,generateImageUrl,cleanupFile} from "../infrastructure/middlewares/upload.js";
import { ValidationError, ConflictError, NotFoundError, UnauthorizedError ,InternalServerError} from "../Utilities/errors.js";

const router = express.Router();


router.post("/product-image", upload.single("productImage"), async (req, res) => {

try{
if(!req.file){

   return  res.status(404).json(
        {
           success: false,
            message: "No image found"
        }
    );
}

   const imageUrl= generateImageUrl(req.file.filename);


     return res.status(200).json({
         success: true,
         imageUrl: imageUrl,
     })



}catch(err){
    if(req.file){
        cleanupFile(req.file.file.path);
    }

    return res.status(500).json({
        success: false,
        message: "Upload failed"
    });

}
})


export default router;