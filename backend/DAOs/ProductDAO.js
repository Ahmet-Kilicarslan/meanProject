import Product from "../models/Product.js";

import {pool} from "../dbc.js";

export default class ProductDAO {

    static async addProduct(product) {
        try{
        const products=await this.getAllProducts();
        for (const p of products) {
            if (product.name === p.name) {
                console.log("product name already exists");
                return;
            }
        }
        const sql = 'insert into products (name, amount, price,supplier) VALUES (?,?,?,?)';
        const [result] = await pool.query(sql, [product.name, product.amount, product.price,product.supplier]);

        return  new Product(result.insertId, product.name, product.amount, product.price,product.supplier );
    }catch(err){
            console.log(err);
        }

    }

    static async getProduct(id) {
        try{
        const sql = 'select * from products where id = ?';
        const [result] = await pool.query(sql, [id]);
        const fetchedProduct=result[0];
            return new Product(fetchedProduct.id, fetchedProduct.name,
                fetchedProduct.amount, fetchedProduct.price, fetchedProduct.supplier);
    }catch(err){
            console.log(err);
        }


    }

    static async getAllProducts() {
        try{
        const sql = 'select * from products';
        const [result] = await pool.query(sql);
        return result.map(product => new Product(product.id, product.name, product.amount, product.price, product.supplier));
    }catch(err){
            console.log(err);
        }
    }

    static async updateProduct(product) {
        try{
        const sql = 'update products set name=?,amount=?,price=? where id = ?';
        const [result] = await pool.query(sql, [product.name, product.amount, product.price, product.id]);
        return result;
    }catch (err){
            console.log(err);
        }
    }

    static async deleteProduct(id) {
        try{
        const sql = 'delete from products where id = ?';
        const [result] = await pool.query(sql, [id]);
        return result;
    }catch(err){
            console.log(err);
        }
    }


}