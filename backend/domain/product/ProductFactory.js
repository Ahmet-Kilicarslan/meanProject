import Product from "./Product";


export default class ProductFactory {

    static createProduct(product) {
        return new Product(
            null,
            product.name,
            product.amount,
            product.price,
            product.supplier
        );
    }

    static createProductFromDB(row) {
        return new Product(
            row.id,
            row.name,
            row.amount,
            row.price,
            row.supplier
        )
    }


}