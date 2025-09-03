import {Purchase, PurchasedProduct} from "./Purchase.js";


export default class PurchaseFactory {

    static async createPurchase(purchase) {
        return new Purchase(
            null,
            purchase.userId,
            [],
            purchase.totalAmount,
            purchase.date
        )
    }


    static async createPurchaseFromDB(purchase) {
        return new Purchase(
            purchase.id,
            purchase.userId,
            [],
            purchase.totalAmount,
            purchase.date
        )
    }



}