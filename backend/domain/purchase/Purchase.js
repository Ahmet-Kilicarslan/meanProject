export  class Purchase {
    constructor(id,userId,products,totalAmount,date) {
        this.id = id;
        this.userId = userId;//foreign key for user
        this.products = products;
        this.totalAmount = totalAmount;
        this.date = date;
    }
}
export  class PurchasedProduct  {
    constructor(id,purchaseId,productId,quantity,price) {
        this.id = id;
        this.purchaseId = purchaseId;//foreign key for purchase
        this.productId = productId;//foreign key for product
        this.quantity = quantity;
        this.price = price;

    }
}