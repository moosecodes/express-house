import mysql from 'mysql2/promise';

// Configure database connection
const db = mysql.createPool({
  host: '192.168.2.2',           // Replace with your DB host
  user: 'root',                // Replace with your DB username
  password: 'password',        // Replace with your DB password
  database: 'mariadb',   // Replace with your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;