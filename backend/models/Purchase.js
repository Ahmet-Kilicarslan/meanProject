export default class Purchase {
    constructor(id,userId,selectedProducts,totalAmount,date) {
        this.id = id;
        this.userId = userId;//foreign key for user
        this.totalAmount = totalAmount;
        this.date = date;
    }
}