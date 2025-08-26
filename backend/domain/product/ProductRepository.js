import Product from "./Product.js";

import {pool} from "../../infrastructure/dbc.js";

export default class ProductRepository {

    static async addProduct(product) {
        try {
            const products = await this.getAllProducts();
            for (const p of products) {
                if (product.name === p.name) {
                    console.log("product name already exists");
                    return;
                }
            }
            const sql = 'insert into products (name, amount, price,supplier) VALUES (?,?,?,?)';
            const [result] = await pool.query(sql, [product.name, product.amount, product.price, product.supplier]);

            return new Product(result.insertId, product.name, product.amount, product.price, product.supplier);
        } catch (err) {
            console.log(err);
        }

    }

    static async getAllProductsWithDetails() {
        try {
            const sql = `select product.id,
                                product.name,
                                product.amount,
                                product.price,
                                supplier.name,
                                asset.url
                         from products product
                                  left join supplier on product.supplier = supplier.id
                                  left join assets asset on product.id = asset.productId
            `;

            const [result] = await pool.query(sql);
            return result;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    static async getProduct(id) {
        try {
            const sql = 'select * from products where id = ?';
            const [result] = await pool.query(sql, [id]);
            const fetchedProduct = result[0];
            return new Product(fetchedProduct.id, fetchedProduct.name, fetchedProduct.amount, fetchedProduct.price, fetchedProduct.supplier);
        } catch (err) {
            console.log(err);
        }


    }

    static async getProductBySupplier(supplier) {
        try {
            const sql = 'select * from products where supplier=?';
            const [result] = await pool.query(sql, [supplier]);
            return result.map(product => new Product(product.id, product.name, product.amount, product.price, product.supplier));
        } catch (err) {
            console.log(err);
        }
    }

    static async getAllProducts() {
        try {
            const sql = 'select * from products';
            const [result] = await pool.query(sql);
            return result.map(product => new Product(product.id, product.name, product.amount, product.price, product.supplier));
        } catch (err) {
            console.log(err);
        }
    }

    static async updateProduct(product) {
        try {
            const sql = 'update products set name=?,amount=?,price=? where id = ?';
            const [result] = await pool.query(sql, [product.name, product.amount, product.price, product.id]);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    static async updateAmount(id, amount) {
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

    static async deleteProduct(id) {
        try {
            const sql = 'delete from products where id = ?';
            const [result] = await pool.query(sql, [id]);
            return result;
        } catch (err) {
            console.log(err);
        }
    }


}