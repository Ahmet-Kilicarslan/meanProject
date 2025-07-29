import {pool} from "../dbc.js";
import Client from "../models/Client.js";

export default class ClientDAO  {
    static async getClient(id) {
        try{
        const sql='SELECT * FROM clients WHERE id = ?';
        const [result] = await pool.query(sql,[id]);
        const Client=result[0];
        return new Client(
            Client.id,
            Client.name,
            Client.email,
            Client.phone,
            Client.location
            );
    }catch(err){
            console.log(err);
        }
    }
    static async getAllClients(){
        try{
            const sql='SELECT * FROM clients ';
            const [result]=await pool.query(sql);
            return result.map(Client=>new Client(
                Client.id,
                Client.name,
                Client.email,
                Client.phone,
                Client.location
            ));

        }catch(err){
            console.log(err);
        }
    }
    static async addClient(client){
        try{
            const clients=await this.getClient(client);
            for (const c of clients){
                if (c.email === client.email||c.phone === client.phone) {
                    console.log("Client already exists");
                    return;
                }

            }

            const sql='INSERT INTO clients ( name, email, phone,location) VALUES (?,?,?,?) ';
            const [result] = await pool.query(sql,[client.name,client.email,client.phone,client.location]);
            const Client=result[0];
            return new Client(Client.insertId, client.name, client.email, client.phone, client.location);

        }catch(err){
            console.log(err);
        }
    }

    static async updateClient(client){
        try {
            const clients=await this.getClient(client);
            for (const c of clients){
                if (c.email === client.email||c.phone === client.phone) {
                    console.log("Client already exists");
                    return;
                }

            }
            const sql='update clients set name=?,email=?,phone=?,location=? where id=?';
            const [result] = await pool.query(sql,[client.name,client.email,client.phone,client.location,client.id]);
            return result[0];

        }catch(err){
            console.log(err);
        }



    }
    static async deleteClient(id){
        try{
            const sql='DELETE FROM clients WHERE id=?';
            const [result] = await pool.query(sql,[id]);

        }catch (err){
            console.log(err);
        }

    }
}