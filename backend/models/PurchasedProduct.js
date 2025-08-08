export  default class PurchasedProduct  {
    constructor(id,purchaseId,productId,quantity,price) {
        this.id = id;
        this.purchaseId = purchaseId;//foreign key for purchase
        this.productId = productId;//foreign key for product
        this.quantity = quantity;
        this.price = price;

    }
}