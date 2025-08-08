import {pool} from "../dbc.js";

import Purchase from "../models/Purchase";

export default class PurchaseDAO {

    //creating purchase
    static async addPurchase(purchase) {
        try{
            const sql='insert into purchase (userId,totalAmount) values (?,?)';
            const [result] = await pool.query(sql,[purchase.userId,purchase.totalAmount]);
            return new Purchase(result.insertId, purchase.userId,purchase.totalAmount,purchase.date);
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    static async getPurchasesByUserId(userId) {
        try {
            const sql = 'select * from purchase where userId = ?';
            const [result] = await pool.query(sql, [userId]);
            return result.map((purchase) => new Purchase(purchase.id, purchase.userId, purchase.totalAmount, purchase.date));
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}