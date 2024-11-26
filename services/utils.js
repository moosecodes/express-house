import mysql from 'mysql2/promise';
import fetchWeatherData from './weather.js';
import fetchClimateData from './climate.js';

// Configure database connection
export const db = mysql.createPool({
  host: '127.0.0.1',           // Replace with your DB host
  user: 'root',                  // Replace with your DB username
  password: 'password',          // Replace with your DB password
  database: 'mariadb',           // Replace with your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to start readings
export const startReadings = () => {
  fetchWeatherData();
  setInterval(fetchWeatherData, process.env.WEATHER_FETCH_INTERVAL || 600000); // Default interval of 60 seconds

  fetchClimateData();
  setInterval(fetchClimateData, process.env.WEATHER_FETCH_INTERVAL || 600000); // Default interval of 60 seconds
};

export default { db, startReadings };