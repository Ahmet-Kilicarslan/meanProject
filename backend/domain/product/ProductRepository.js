import Product from "./Product.js";
import productFactory from "./ProductFactory.js";

import {pool} from "../../infrastructure/dbc.js";

export default class ProductRepository {


    async save(product) {
        if (product.id) {
            return this.updateProduct(product);

        } else return this.createProduct(product);
    }

    async createProduct(product) {
        try {

            const sql = 'insert into products (name, amount, price,supplier) VALUES (?,?,?,?)';
            const [result] = await pool.query(sql, [
                product.name,
                product.amount,
                product.price,
                product.supplier
            ]);

            product.id = result.insertId;
            return product;

        } catch (err) {
            console.log(err);
            throw err;
        }

    }

    async getProductByName(name) {
        try {

            const sql = 'SELECT * FROM products WHERE name=?';
            const [result] = await pool.query(sql, [name]);
            if(result.length ===0) return null;
            return result;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getAllProductsWithDetails() {
        try {

            const sql = `SELECT product.id,
                                product.name,
                                product.amount,
                                product.price,
                                product.supplier,
                                supplier.name as supplierName,
                                asset.url     as imageUrl
                         FROM products product
                                  LEFT JOIN supplier ON product.supplier = supplier.id
                                  LEFT JOIN assets asset ON product.id = asset.productId
            `;

            const [result] = await pool.query(sql);



            return result;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getProductById(id) {
        try {
            const sql = 'select * from products where id = ?';

            const [result] = await pool.query(sql, [id]);
            const fetchedProduct = result[0];

            if (result.length === 0) return null;


            return productFactory.createProductFromDB(fetchedProduct);

        } catch (err) {
            console.log(err);
        }


    }

    async getProductBySupplier(supplier) {
        try {
            const sql = 'select * from products where supplier=?';
            const [result] = await pool.query(sql, [supplier]);
            return result.map(row => productFactory.createProductFromDB(row));
        } catch (err) {
            console.log(err);
        }
    }

    async getAllProducts() {
        try {
            const sql = 'select * from products';
            const [result] = await pool.query(sql);
            return result.map(row => productFactory.createProductFromDB(row));
        } catch (err) {
            console.log(err);
        }
    }

    async updateProduct(product) {
        try {

            const sql = 'update products set name=?,amount=?,price=? where id = ?';
            const [result] = await pool.query(sql, [product.name, product.amount, product.price, product.id]);
            return result;

        } catch (err) {
            console.log(err);
        }
    }

    async updateAmount(id, amount) {
        try {
            console.log(`🔄 DAO: updateAmount called with id=${id}, amount=${amount}`);
            console.log(`📊 DAO: Amount type:`, typeof amount);

            const sql = 'update products set amount=? where id=?';

            console.log(`📝 DAO: Executing SQL:`, sql);
            console.log(`📝 DAO: With parameters:`, [amount, id]);

            const [result] = await pool.query(sql, [amount, id]);

            console.log(`✅ DAO: Query result:`, result);
            console.log(`✅ DAO: Affected rows:`, result.affectedRows);

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteProduct(id) {
        try {
            const sql = 'delete from products where id = ?';
            const [result] = await pool.query(sql, [id]);
            return result.affectedRows > 0;
        } catch (err) {
            console.log(err);
        }
    }


}