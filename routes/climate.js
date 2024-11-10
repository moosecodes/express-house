import express from 'express';
import axios from 'axios';
import db from '../services/utils.js';

const router = express.Router();

const fetchClimateData = async () => {
  console.log(new Date().toString());
  try {


  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

fetchClimateData();
setInterval(fetchClimateData, process.env.ETCH_INTERVAL);

/* GET apit routes. */
router.get('/climate/current', (req, res, next) => {
  db.query('SELECT * FROM expressdb.dht11_readings ORDER BY created_at DESC LIMIT 1', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/climate/recent', (req, res, next) => {
  db.query('SELECT * FROM expressdb.dht11_readings ORDER BY created_at DESC LIMIT 10000', (err, results) => {
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
