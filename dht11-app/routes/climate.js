import express from 'express';
import db from '../utils/database.js';

const router = express.Router();


(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    console.log('Test Query Result:', rows);
  } catch (err) {
    console.error('Database Connection Error:', err.message);
  }
})();


/* GET current climate data */
router.get('/current', async (req, res, next) => {
  console.log('GET /current endpoint hit');

  try {
    const [results] = await db.query('SELECT * FROM mariadb.dht11_readings ORDER BY created_at DESC LIMIT 1');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET recent climate data */
router.get('/recent', async (req, res, next) => {
  console.log('GET /recent endpoint hit');

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
