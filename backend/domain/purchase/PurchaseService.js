export default class PurchaseService {
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    async createPurchase(purchase) {
        try {
            return await this.purchaseRepository.createPurchase(purchase);
        } catch (err) {
            console.log(err);
            throw err;
        }


    }

    async getPurchaseByUserId(userId) {
        try{
            return await this.purchaseRepository.getPurchaseByUserId(userId);
        }catch(error){
            throw error;
        }
    }

    async getPurchasesByUserIdInAscendingOrder(userId) {
        try{
            return await this.purchaseRepository.getPurchasesByUserIdInAscendingOrder(userId);
        }catch(error){
            throw error;
        }
    }

    async getPurchaseByUserIdInDescendingOrder(userId) {
        try{
            return await this.purchaseRepository.getPurchasesByUserIdInDescendingOrder(userId);
        }catch(error){
            throw error;
        }
    }

    async getPurchasedProductsByPurchaseId(purchaseId) {
        try{
            return await this.purchaseRepository.getPurchasedProductsByPurchaseId(purchaseId);
        }catch(error){
            throw error;
        }
    }

    async addProductToPurchasedProduct(purchasedProduct) {
        try{
            return await this.purchaseRepository.addProductToPurchasedProduct(purchasedProduct);
        }catch(error){
            throw error;
        }
    }

    async getAllPurchase(){
        try{
            return await this.purchaseRepository.getAllPurchase();
        }catch(error){
            throw error;
        }
    }


}