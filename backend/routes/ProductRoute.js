import express from "express";
import ProductDAO from "../DAOs/ProductDAO.js";

const router=express.Router();
/*add product*/
router.post("/", async (req,res)=>{
    const newProduct=await ProductDAO.addProduct(req.body);
    res.json(newProduct);

})


/*get by supplier*/
router.get('/:supplier',async(req,res)=>{
    try{
        const fetchedProducts=await ProductDAO.getProductBySupplier(req.params.supplier);
        res.status(200).json(fetchedProducts);
    }catch(error){

        res.status(404).json({error:error.message});
    }
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
router.put("/:id",async (req,res)=>{
    try {
        const id = req.params.id;
        const updatedProduct = await ProductDAO.updateProduct(id, req.body);
        res.json(updatedProduct);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: 'updating product amount failed',
            message: err.message
        });
    }
})
/*delete*/
router.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    const product = await ProductDAO.deleteProduct(id);
    res.json(product);

})
export default router;