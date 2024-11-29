import express from 'express';
import db from '../utils/database.js';

const router = express.Router();

/* GET current weather data */
router.get('/current', async (req, res, next) => {
  try {
    const [results] = await db.query('SELECT * FROM mariadb.weather_readings ORDER BY created_at DESC LIMIT 1');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET recent weather data */
router.get('/recent', async (req, res, next) => {
  try {
    const [results] = await db.query('SELECT * FROM mariadb.weather_readings ORDER BY created_at DESC LIMIT 10000');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Test endpoint */
router.get('/test', (req, res, next) => {
  res.json({ message: "testing weather endpoint" });
});

export default router;
