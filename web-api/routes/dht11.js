import express from 'express';
import db from '../utils/database.js';

const router = express.Router();


(async () => {
  try {
    const [rows] = await db.query('SELECT 3 + 1 AS solution');
    console.log('Database Sanity Check Complete...', rows);
  } catch (err) {
    console.error('Database Connection Error:', err.message);
  }
})();


/* GET current climate data */
router.get('/current', async (req, res, next) => {
  try {
    const [results] = await db.query('SELECT * FROM mariadb.dht11_readings ORDER BY created_at DESC LIMIT 1');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET recent climate data */
router.get('/recent', async (req, res, next) => {
  try {
    const [results] = await db.query('SELECT * FROM mariadb.dht11_readings ORDER BY created_at DESC LIMIT 10000');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Test endpoint */
router.get('/test', (req, res, next) => {
  res.json({ message: "testing climate endpoint" });
});

export default router;
