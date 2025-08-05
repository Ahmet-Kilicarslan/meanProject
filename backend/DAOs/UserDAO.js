import User from '../models/User.js';
import { pool } from "../dbc.js";


export default class UserDAO {

    //add new
    static async addUser(user){

        try{
            const users= await this.getAllUsers();
            for(const existingUser of users){
                if(existingUser.username===user.username){
                    console.log("User already exists");
                    return null;
                }
            }
            const sql='insert into user (username,password,role,email) values(?,?,?,?)';
            const [result] = await pool.query(sql,[user.username,user.password,user.role,user.email]);
            user.id=result.insertId;
            return user;
        }catch(error){
            console.error(error);
            throw error;
        }

    }
    static async getAllUsers(){
        try{
            const sql="select * from user";
            const [result]= await pool.query(sql);
            return result.map(user=> new User(
                user.id,
                user.username,
                user.password,
                user.role,
                user.email,

            ));


        }catch(error){
            console.error(error);
            throw error;
        }
    }

    static async updateUser(user){
        try{
            const sql="update user set user.username=? ,user.password=?,user.email=? where id=?"
            const [result]=await pool.query(sql,[user.username,user.password,user.email,user.id]);
            return result;

        }catch(error){
            console.error(error);
            throw error;
        }
    }

    static async deleteUser(id){
        try{
            const sql="delete from user where id=?";
            const [result]=await pool.query(sql,[id]);
            return result;
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    static async getUserByUsernameOrEmail(usernameOrEmail) {
        try {
            const sql = "SELECT * FROM user WHERE username = ? OR email = ?";
            const [result] = await pool.query(sql, [usernameOrEmail, usernameOrEmail]);

            if (result.length === 0) {
                return null; // User not found
            }

            const user = result[0];
            return new User(user.id, user.username, user.password, user.role, user.email);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async getUserById(id){
        try{
            const sql='select * from user WHERE id=?';
            const [result]=await pool.query(sql,[id]);
            if (result.length === 0) {
                return null;
            }

            const user = result[0];
            return new User(user.id, user.username, user.password, user.role, user.email);

        }catch (error) {
            console.error(error);
            throw error;

        }
    }
}