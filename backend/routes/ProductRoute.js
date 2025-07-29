import express from "express";
import ProductDAO from "../DAOs/ProductDAO.js";

const router=express.Router();
/*add product*/
router.post("/", async (req,res)=>{
    const newProduct=await ProductDAO.addProduct(req.body);
    res.json(newProduct);

})
/*get all*/
router.get("/",async (req,res)=>{
    const allProducts=await ProductDAO.getAllProducts();
    res.json(allProducts);

})
/*get one*/
router.get("/:id",async (req,res)=>{
    const id = req.params.id;
    const product = await ProductDAO.getProduct(id);
    res.json(product);
})
/*update*/
router.put("/",async (req,res)=>{

    try {
        const product = await ProductDAO.updateProduct(req.body);
        res.json(product);
    }catch(err){
        console.log(err);
    }
})
/*delete*/
router.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    const product = await ProductDAO.deleteProduct(id);
    res.json(product);

})
export default router;