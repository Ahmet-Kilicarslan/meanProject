import express from "express";
import {upload,generateImageUrl,handleMulterError,cleanupFile} from "../infrastructure/middlewares/upload.js";


const router = express.Router();


router.post("/product-image", upload.single("productImage"), async (req, res) => {


})