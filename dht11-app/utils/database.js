import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: '10.0.0.225',  // or 127.0.0.1
  user: 'root',
  password: 'password',
  database: 'mariadb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
