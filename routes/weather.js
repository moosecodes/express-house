import express from 'express';
import axios from 'axios';
import db from '../services/utils.js';

const router = express.Router();

/* GET apit routes. */
router.get('/weather/current', (req, res, next) => {
  db.query('SELECT * FROM mariadb.weather_readings ORDER BY created_at DESC LIMIT 1', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/weather/recent', (req, res, next) => {
  db.query('SELECT * FROM mariadb.weather_readings ORDER BY created_at DESC LIMIT 10000', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/weather/test', (req, res, next) => {
  res.json({ message: "testing weather endpoint" });
});

export default router;
