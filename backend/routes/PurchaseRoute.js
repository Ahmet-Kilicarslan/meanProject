import express from "express";
import PurchaseDAO from "../DAOs/PurchaseDAO.js";

const router = express.Router();



router.post("/create", async (req, res) => {
    try {
        const { userId, totalAmount, products } = req.body;


        const newPurchase = await PurchaseDAO.CreatePurchase({ userId, totalAmount });

        // 2. Add all products to that purchase
        const purchasedProducts = [];
        for (const product of products) {
            const purchasedProduct = await PurchaseDAO.addProductToPurchasedProduct({
                purchaseId: newPurchase.id,
                productId: product.productId,
                quantity: product.quantity,
                price: product.price
            });
            purchasedProducts.push(purchasedProduct);
        }

        res.status(201).json({
            purchase: newPurchase,
            products: purchasedProducts
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Complete purchase failed',
            message: err.message
        });
    }
});

//getting purchases by userId
router.get("/byUser/:userId", async (req,res)=>{
    try{
        const purchases= await PurchaseDAO.getPurchasesByUserId(req.params.userId);
        res.status(200).json(purchases);

    }catch(err){
        console.error(err);
        res.status(500).json({
            error: 'Failed to fetch purchases made by user failed',
            message: err.message
        })
    }



})
//getting purchases by userId in descending order
router.get("/byUserInDesc/:UserId", async (req,res)=>{
    try{
        const purchases = await PurchaseDAO.getPurchasesByUserIdInDescendingOrder(req.params.userId);
        res.status(200).json(purchases);

    }catch(err){console.error(err);
        res.status(500).json({
            error: 'Failed to fetch purchases made by user failed',
            message: err.message
        })}
})

//adding product as purchased product
router.post("/products", async (req,res)=>{
    try{
        const selectedProductForPurchase=await PurchaseDAO.addProductToPurchasedProduct(req.body);
        res.status(200).json({selectedProductForPurchase:selectedProductForPurchase});
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: 'failed to add products to purchase',
            message: err.message
        })
    }


})

//getting products with same purchaseId
router.get("/byPurchase/:purchaseId", async (req,res)=>{
    try{
        const fetchedProducts=await PurchaseDAO.getPurchasedProductsByPurchaseId(req.params.purchaseId);

        console.log('🔍 Backend: DAO returned:', fetchedProducts);
        console.log('🔍 Backend: Number of products:', fetchedProducts?.length);
        console.log('🔍 Backend: First product:', fetchedProducts[0]);

        res.status(200).json(fetchedProducts);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: 'failed to get products from purchase',
            message: err.message
        })
    }

})

export default router;