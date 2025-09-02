import mysql from 'mysql2/promise';
import 'dotenv/config';

export  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,//A#*s*irP"8@q1n*2
    database:process.env.DB_NAME,//A#*s*irP"8@q1n*2
    waitForConnections: true, //tree -I 'node_modules|dist|build'
    connectionLimit: 10,
    queueLimit: 0
    /*
    change password:
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourStrongPassword';
    FLUSH PRIVILEGES;


    backup data :
    mysqldump -u root -p frost > backup.sql

    to insert existing data from outside sql file:
    mysql -u root -p frost < /home/ahmet/Desktop/full_backup.sql

        */

});