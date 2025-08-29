

export default class Product {
    constructor (id,name,amount,price,supplier) {
        this.id=id;
        this.name=name;
        this.amount=amount;
        this.price=price;
        this.supplier=supplier;


    }

    changeName(newName) {
        this.name= newName;
    }

    changeAmount(newAmount) {
        this.amount=newAmount;
    }

    changePrice(newPrice) {
        this.price=newPrice;
    }



}