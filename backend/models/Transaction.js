export default class Transaction {
    constructor (id,Product_id,Client_id,Employee_id,Action,Amount,date) {
        this.id = id;
        this.Product_id = Product_id;
        this.Client_id = Client_id;
        this.Employee_id = Employee_id;
        this.Action = Action;
        this.Amount = Amount;
        this.date = date;
    }
}