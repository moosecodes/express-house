import express from 'express';
import db from '../utils/database.js';

const router = express.Router();

(async () => {
  try {
    const [rows] = await db.query('SELECT 6 + 1 AS solution');
    console.log('Weather API Database Sanity Check Complete:', rows);
  } catch (err) {
    console.error('Database Connection Error:', err.message);
  }
})();

/* Test endpoint */
router.get('/test', (req, res, next) => {
  res.json({ message: "testing weather endpoint" });
});

export default router;
