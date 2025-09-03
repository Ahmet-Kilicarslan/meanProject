import Supplier from "./Supplier.js";


export default class SupplierFactory  {


    static createSupplier(supplier) {
        return new Supplier(
            null,
            supplier.name,
            supplier.contact
        );
    }

    static createSupplierFromDB(row){
        return new Supplier(
            row.id,
            row.name,
            row.contact
        )
    }


}