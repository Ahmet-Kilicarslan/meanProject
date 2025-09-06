import Supplier from "./Supplier.js";
import { pool } from "../../infrastructure/dbc.js";
import supplierFactory from "./SupplierFactory.js";

export default class SupplierRepository {

    // Add a new supplier
     async createSupplier(supplier) {
        try {

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
     async getSupplier(id) {
        try {
            const sql = 'SELECT * FROM supplier WHERE id = ?';
            const [rows] = await pool.query(sql, [id]);

            if (rows.length === 0) return null;

            return await supplierFactory.createSupplierFromDB(rows[0]);

        } catch (err) {
            console.error("Error fetching supplier:", err);
            throw err;
        }
    }


    async getSupplierByName(name) {
         try{
             const sql = 'SELECT * FROM supplier WHERE name=?';
             const [rows] = await pool.query(sql, [name]);

             if (rows.length === 0) return null;

             return rows ;


         }catch(err){

             throw err;
         }


    }

    // Get all suppliers
     async getAllSuppliers() {
        try {
            const sql = 'SELECT * FROM supplier';

            const [rows] = await pool.query(sql);

            return rows.map(supplier => supplierFactory.createSupplierFromDB(supplier));

        } catch (err) {
            console.error("Error fetching all suppliers:", err);
            throw err;
        }
    }

    // Update a supplier
     async updateSupplier(supplier) {
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
     async deleteSupplier(id) {
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

