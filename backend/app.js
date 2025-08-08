import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import mysql from 'mysql2/promise';
import 'dotenv/config';


import EmployeeRoute from './routes/EmployeeRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import SupplierRoute from "./routes/SupplierRoute.js";

import UserRoute from "./routes/UserRoute.js";

const MysqlStore = new MySQLStoreFactory(session);
//create an express app
const app = express();

//enable express to parse incoming requests
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', // Your Angular app URL
    credentials: true, // This allows cookies to be sent back and forth
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//enable express to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStoreOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}
const sessionStore=new MysqlStore(sessionStoreOptions);
// Session middleware configuration
app.use(session({
    key: 'sessionId', // This will be the cookie name in browser
    secret: process.env.SESSION_SECRET,
    store: sessionStore, // Use our MySQL store
    resave: false, // Don't save session if nothing changed
    saveUninitialized: false, // Don't save empty sessions
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true, // Browser JavaScript cannot access this cookie (security)
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        sameSite: 'lax' // CSRF protection
    }
}));

app.use('/Employee', EmployeeRoute);
app.use('/Product', ProductRoute);
app.use('/User', UserRoute);
app.use('/Supplier', SupplierRoute);

/*
2xx Success

200 OK: Request successful, response has content
201 Created: Resource successfully created (POST requests)
204 No Content: Request successful, no response body (DELETE requests)

3xx Redirection

301 Moved Permanently: URL permanently redirected
302 Found: Temporary redirect
304 Not Modified: Cached version is still valid

4xx Client Errors

400 Bad Request: Invalid request syntax or data
401 Unauthorized: Authentication required or failed
403 Forbidden: Server understood request but refuses to authorize
404 Not Found: Resource doesn't exist
405 Method Not Allowed: HTTP method not supported for this endpoint
409 Conflict: Request conflicts with current resource state (duplicates)
422 Unprocessable Entity: Request valid but contains semantic errors
429 Too Many Requests: Rate limiting exceeded

5xx Server Errors

500 Internal Server Error: Generic server error
502 Bad Gateway: Server received invalid response from upstream
503 Service Unavailable: Server temporarily unavailable
504 Gateway Timeout: Upstream server timeout


*/
async function testDatabaseConnection() {
    console.log('🔍 Testing database connection...');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_PORT:', process.env.DB_PORT);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_NAME:', process.env.DB_NAME);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('✅ Database connection successful!');

        // Test a simple query
        const [rows] = await connection.execute('SELECT DATABASE() as current_db');
        console.log('Current database:', rows[0].current_db);

        await connection.end();
        console.log('✅ Connection closed successfully');

    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('Error code:', error.code);
        console.error('Error errno:', error.errno);
    }
}


testDatabaseConnection();


export default app;


