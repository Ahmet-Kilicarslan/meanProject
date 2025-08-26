import Supplier from "./Supplier.js";
import { pool } from "../../infrastructure/dbc.js";

export default class SupplierRepository {
    // Add a new supplier
    static async addSupplier(supplier) {
        try {
            const suppliers=await this.getAllSuppliers();
            for( const existingSupplier in suppliers){
                if(existingSupplier.name === supplier.name){
                    console.log("This supplier has already been added");
                    return ;
                }
            }
            const sql = 'INSERT INTO supplier (name, contact) VALUES (?, ?)';
            const [result] = await pool.query(sql, [supplier.name, supplier.contact]);
            supplier.id = result.insertId;
            return supplier;
        } catch (err) {
            console.error("Error adding supplier:", err);
            throw err;
        }
    }

    // Get a supplier by ID
    static async getSupplier(id) {
        try {
            const sql = 'SELECT * FROM supplier WHERE id = ?';
            const [rows] = await pool.query(sql, [id]);

            if (rows.length === 0) return null;

            const s = rows[0];
            return new Supplier(s.id, s.name, s.contact);
        } catch (err) {
            console.error("Error fetching supplier:", err);
            throw err;
        }
    }

    // Get all suppliers
    static async getAllSuppliers() {
        try {
            const sql = 'SELECT * FROM supplier';
            const [rows] = await pool.query(sql);
            return rows.map(s => new Supplier(s.id, s.name, s.contact));
        } catch (err) {
            console.error("Error fetching all suppliers:", err);
            throw err;
        }
    }

    // Update a supplier
    static async updateSupplier(supplier) {
        try {
            const sql = 'UPDATE supplier SET name = ?, contact = ? WHERE id = ?';
            const [result] = await pool.query(sql, [supplier.name, supplier.contact, supplier.id]);
            return result;
        } catch (err) {
            console.error("Error updating supplier:", err);
            throw err;
        }
    }

    // Delete a supplier by ID
    static async deleteSupplier(id) {
        try {
            const sql = 'DELETE FROM supplier WHERE id = ?';
            const [result] = await pool.query(sql, [id]);
            return result;
        } catch (err) {
            console.error("Error deleting supplier:", err);
            throw err;
        }
    }
}

