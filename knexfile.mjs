// knexfile.mjs
import { pool } from "./backend/infrastructure/dbc.js";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Debug: Print loaded variables (remove after testing)
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : 'NOT SET');

export default {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },

    production: {
        client: 'mysql2',
        connection: pool,
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations'
        }
    }
};