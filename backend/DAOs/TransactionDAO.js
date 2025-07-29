import Transaction from "../models/Transaction.js";
import {pool} from "../dbc.js";

export default class TransactionDAO {
    // Add a new transaction
    static async addTransaction(transaction) {
        try {
            const sql = `
                INSERT INTO transactions
                    (Product_id, Client_id, Employee_id, Action, Amount, date)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const [result] = await pool.query(sql, [
                transaction.Product_id,
                transaction.Client_id,
                transaction.Employee_id,
                transaction.Action,
                transaction.Amount,
                transaction.date
            ]);

            transaction.id = result.insertId;
            return transaction;
        } catch (err) {
            console.error("Error adding transaction:", err);
            throw err;
        }
    }

    // Get a transaction by ID
    static async getTransaction(id) {
        try {
            const sql = 'SELECT * FROM transactions WHERE id = ?';
            const [rows] = await pool.query(sql, [id]);

            if (rows.length === 0) return null;

            const t = rows[0];
            return new Transaction(
                t.id,
                t.Product_id,
                t.Client_id,
                t.Employee_id,
                t.Action,
                t.Amount,
                t.date
            );
        } catch (err) {
            console.error("Error fetching transaction:", err);
            throw err;
        }
    }

    // Get all transactions
    static async getAllTransactions() {
        try {
            const sql = 'SELECT * FROM transactions';
            const [rows] = await pool.query(sql);

            return rows.map(t => new Transaction(
                t.id,
                t.Product_id,
                t.Client_id,
                t.Employee_id,
                t.Action,
                t.Amount,
                t.date
            ));
        } catch (err) {
            console.error("Error fetching all transactions:", err);
            throw err;
        }
    }




}
