import axios from "axios";
import { db } from '../services/utils.js';

const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `${process.env.OPENWEATHER_BASE_URL}?appid=${process.env.OPENWEATHER_API_KEY}&lat=${process.env.OPENWEATHER_LAT}&lon=${process.env.OPENWEATHER_LONG}&units=${process.env.OPENWEATHER_UNITS}`
    );

    const weatherData = response.data;

    const { temp, feels_like, temp_min, temp_max, humidity } = weatherData.main;
    const { main, description } = weatherData.weather[0];
    const { name } = weatherData;

    const insertQuery = `
      INSERT INTO mariadb.weather_readings 
      (farenheit, feels_like, temp_min, temp_max, humidity, name, conditions, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    console.log("Weather data:", [temp, feels_like, temp_min, temp_max, humidity, name, description]);

    db.query(insertQuery, [temp, feels_like, temp_min, temp_max, humidity, name, main, description], (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
      } else {
        console.log("Weather data saved to database:", results);
      }
    });

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

export default fetchWeatherData;