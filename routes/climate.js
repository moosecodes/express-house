import express from 'express';
import mysql from 'mysql2/promise';

// Configure database connection
const db = mysql.createPool({
  host: '127.0.0.1',           // Replace with your DB host
  user: 'root',                  // Replace with your DB username
  password: 'password',          // Replace with your DB password
  database: 'mariadb',           // Replace with your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const router = express.Router();

/* GET apit routes. */
router.get('/climate/current', (req, res, next) => {
  db.query('SELECT * FROM mariadb.dht11_readings ORDER BY created_at DESC LIMIT 1', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/climate/recent', (req, res, next) => {
  db.query('SELECT * FROM mariadb.dht11_readings ORDER BY created_at DESC LIMIT 10000', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/climate/test', (req, res, next) => {
  res.json({ message: "testing climate endpoint" });
});

export default router;
