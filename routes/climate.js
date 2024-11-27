import express from 'express';
import db from '../utils/database.js';

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
