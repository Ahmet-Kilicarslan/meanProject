import express from "express";
import PurchaseRepository from "../domain/purchase/PurchaseRepository.js";

const router = express.Router();



router.post("/create", async (req, res) => {
    try {
        const { userId, totalAmount, products } = req.body;


        const newPurchase = await PurchaseRepository.CreatePurchase({ userId, totalAmount });


        const purchasedProducts = [];
        for (const product of products) {
            const purchasedProduct = await PurchaseRepository.addProductToPurchasedProduct({
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
router.get("/byUserId/:userId", async (req, res) => {
    try{

        const { userId } = req.params;
        const order = req.query.order || 'desc';

        if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({
                error: 'Invalid order parameter. Must be "asc" or "desc"'
            });
        }
        const purchases = await PurchaseRepository.getPurchaseByUserId(userId, order);
        res.status(200).json(purchases);




    }catch(err){
        console.error(err);
        res.status(500).json({
            error: 'Failed to fetch purchases made by user ',
            message: err.message
        })
    }
})

//getting purchases by userId in ascending order
router.get("/byUserInAsc/:userId", async (req,res)=>{
    try{
        const purchases= await PurchaseRepository.getPurchasesByUserIdInAscendingOrder(req.params.userId);
        res.status(200).json(purchases);

    }catch(err){
        console.error(err);
        res.status(500).json({
            error: 'Failed to fetch purchases made by user ',
            message: err.message
        })
    }



})
//getting purchases by userId in descending order
router.get("/byUserInDesc/:userId", async (req,res)=>{
    try{
        const purchases = await PurchaseRepository.getPurchasesByUserIdInDescendingOrder(req.params.userId);
        res.status(200).json(purchases);

    }catch(err){console.error(err);
        res.status(500).json({
            error: 'Failed to fetch purchases made by user ',
            message: err.message
        })}
})

//adding product as purchased product
router.post("/products", async (req,res)=>{
    try{
        const selectedProductForPurchase=await PurchaseRepository.addProductToPurchasedProduct(req.body);
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
        const fetchedProducts=await PurchaseRepository.getPurchasedProductsByPurchaseId(req.params.purchaseId);

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