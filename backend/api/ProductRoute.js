import express from "express";
import ProductRepository from "../domain/product/ProductRepository.js";

const router = express.Router();



router.get("/test", async (req, res) => {
    console.log("allah belanı versin adi köpek")
})

/*add product*/
router.post("/", async (req, res) => {
    const newProduct = await ProductRepository.createProduct(req.body);
    res.json(newProduct);

})
router.get("/getALL", async (req, res) => {

    try {
        const allProducts = await ProductRepository.getAllProductsWithDetails();

        res.status(200).json(allProducts);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }


})

/*get by supplier*/
router.get('/getBySupplierId/:supplier', async (req, res) => {
    try {
        const fetchedProducts = await ProductRepository.getProductBySupplier(req.params.supplier);
        res.status(200).json(fetchedProducts);
    } catch (error) {

        res.status(404).json({error: error.message});
    }
})
/*get all*/
router.get("/", async (req, res) => {
    const allProducts = await ProductRepository.getAllProducts();
    res.json(allProducts);

})

//get all with details

/*get one*/
router.get("/getByProductId/:id", async (req, res) => {
    const id = req.params.id;
    const product = await ProductRepository.getProductById(id);
    res.json(product);
})
/*update*/
router.put("/", async (req, res) => {

    try {
        const product = await ProductRepository.updateProduct(req.body);
        res.json(product);
    } catch (err) {
        console.log(err);
    }
})

//update amount
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {amount} = req.body;

        console.log(`🔄 Backend router: Received update request for product ID: ${id}`);
        console.log(`📊 Backend router: Request body:`, req.body);
        console.log(`📊 Backend router: Request body type:`, typeof req.body);

        const updatedProduct = await ProductRepository.updateAmount(id, amount);

        console.log('✅ Backend router: Update completed:', updatedProduct);

        res.json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'updating product amount failed',
            message: err.message
        });
    }
})
/*delete*/
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await ProductRepository.deleteProduct(id);
    res.json(product);

})
export default router;