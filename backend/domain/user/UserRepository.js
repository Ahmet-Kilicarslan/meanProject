import User from './User.js';
import userFactory from './UserFactory.js';
import {pool} from "../../infrastructure/dbc.js";


export default class UserRepository {

    async save(user) {
        if (user.id) {
            return this.updateUser(user);
        } else {
            return this.createUser(user);
        }
    }
    async createUser(user) {

        try {

            const sql = 'INSERT INTO user (username,password,role,email) VALUES (?,?,?,?)';
            const [result] = await pool.query(sql, [
                user.username,
                user.password,
                user.role,
                user.email
            ]);


            user.id = result.insertId;
            return user;

        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async updateUser(user) {
        try {

            const sql = "UPDATE user SET user.username=? ,user.password=?,user.email=? WHERE id=?"
            const [result] = await pool.query(sql, [
                user.username,
                user.password,
                user.email,
                user.id
            ]);
            return result;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {

            const sql = "DELETE FROM user WHERE id=?";
            const [result] = await pool.query(sql, [id]);
            return result.affectedRows > 0;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const sql = "SELECT * FROM user";
            const [result] = await pool.query(sql);
            return result.map(row => userFactory.CreateUserFromDB(row));

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByUsernameOrEmail(usernameOrEmail) {
        try {
            const sql = "SELECT * FROM user WHERE username = ? OR email = ?";
            const [result] = await pool.query(sql, [usernameOrEmail, usernameOrEmail]);

            if (result.length === 0)return null;

            return userFactory.CreateUserFromDB(result[0]);


        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async GetByUsername(username) {
        try {

            const sql = 'SELECT * FROM user WHERE username = ?';
            const [result] = await pool.query(sql, [username]);

            return userFactory.CreateUserFromDB(result[0]);

        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async getUserById(id) {
        try {
            const sql = 'SELECT * FROM user WHERE id=?';
            const [result] = await pool.query(sql, [id]);

            if (result.length === 0) return null;


            return userFactory.CreateUserFromDB(result[0]);

        } catch (error) {
            console.error(error);
            throw error;

        }
    }


}