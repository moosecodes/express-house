import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: 'root',
  password: 'password',
  database: 'mariadb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
