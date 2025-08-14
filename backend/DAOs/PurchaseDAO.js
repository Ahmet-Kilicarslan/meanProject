import {pool} from "../dbc.js";

import {Purchase,PurchasedProduct} from "../models/Purchase";

export default class PurchaseDAO {

    //creating purchase
    static async CreatePurchase(purchase) {
        try {
            const sql = 'insert into purchase (userId,totalAmount) values (?,?)';
            const [result] = await pool.query(sql, [purchase.userId, purchase.totalAmount]);
            return new Purchase(result.insertId, purchase.userId,[], purchase.totalAmount, purchase.date,);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
//getting purchases by user id
    static async getPurchasesByUserId(userId) {
        try {
            const sql = 'select * from purchase where userId = ?';
            const [result] = await pool.query(sql, [userId]);
            return result.map((purchase) => new Purchase(purchase.id, purchase.userId, [],purchase.totalAmount, purchase.date));
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    //get purchase with items
    static async getPurchaseWithItems(purchaseId) {
        try {
            const sql = `
                SELECT p.id  as purchaseId,
                       p.userId,
                       p.totalAmount,
                       p.date,
                       pp.id as id,
                       pp.productId,
                       pp.quantity,
                       pp.price
                FROM purchase p
                         LEFT JOIN purchasedProduct pp ON p.id = pp.purchaseId
                WHERE p.id = ?
            `;

            const [rows]=await pool.query(sql,[purchaseId]);
            if (rows.length === 0) {
                return null; // Purchase not found
            }


            const purchaseData = rows[0];

            const purchase = new Purchase(
                purchaseData.purchaseId,
                purchaseData.userId,
                [],
                purchaseData.totalAmount,
                purchaseData.date
            );

            purchase.products = rows.filter(row => row.id !== null)
                .map(row => new PurchasedProduct(
                    row.id,
                    purchaseData.purchaseId,
                    row.productId,
                    row.quantity,
                    row.price
                ));

            return purchase;


        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    static async addProductToPurchasedProduct(purchasedProduct) {
        try{
            const sql='insert into purchasedProduct ( purchaseId, productId, quantity, price) values (?,?,?,?) ';
            const [result] = await pool.query(sql, [
                purchasedProduct.purchaseId,
                purchasedProduct.productId,
                purchasedProduct.quantity,
                purchasedProduct.price
            ]);
            return new PurchasedProduct(
                result.insertId,
                purchasedProduct.purchaseId,
                purchasedProduct.productId,
                purchasedProduct.quantity,
                purchasedProduct.price
            );

        }catch(err){
            console.log(err);
            throw err;

        }
    }
}