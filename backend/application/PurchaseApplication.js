
export default class PurchaseApplication {

    constructor(purchaseRepository, purchaseService) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseService = purchaseService;
    }


    async createPurchase(purchase) {
        try {
            return await this.purchaseService.createPurchase(purchase);
        } catch (err) {
            console.log(err);
            throw err;
        }


    }

    async getPurchaseByUserId(userId) {
        try{
            return await this.purchaseService.getPurchaseByUserId(userId);
        }catch(error){
            throw error;
        }
    }

    async getPurchasesByUserIdInAscendingOrder(userId) {
        try{
            return await this.purchaseService.getPurchasesByUserIdInAscendingOrder(userId);
        }catch(error){
            throw error;
        }
    }

    async getPurchasesByUserIdInDescendingOrder(userId) {
        try{
            return await this.purchaseService.getPurchaseByUserIdInDescendingOrder(userId);
        }catch(error){
            throw error;
        }
    }

    async getPurchasedProductsByPurchaseId(purchaseId) {
        try{
            return await this.purchaseService.getPurchasedProductsByPurchaseId(purchaseId);
        }catch(error){
            throw error;
        }
    }

    async addProductToPurchasedProduct(purchasedProduct) {
        try{
            return await this.purchaseService.addProductToPurchasedProduct(purchasedProduct);
        }catch(error){
            throw error;
        }
    }

    async getAllPurchase(){
        try{
            return await this.purchaseService.getAllPurchase();
        }catch(error){
            throw error;
        }
    }

}