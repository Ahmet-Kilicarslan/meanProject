// knexfile.mjs
import { pool } from "./backend/dbc.js";

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