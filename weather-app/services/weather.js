import axios from "axios";
import db from '../utils/database.js';

const fetchWeatherData = async () => {
  try {
    // Fetch weather data from OpenWeather API
    const response = await axios.get(
      `${process.env.OPENWEATHER_BASE_URL}?appid=${process.env.OPENWEATHER_API_KEY}&lat=${process.env.OPENWEATHER_LAT}&lon=${process.env.OPENWEATHER_LONG}&units=${process.env.OPENWEATHER_UNITS}`
    );

    const weatherData = response.data;

    const { lat, lon } = weatherData.coord;
    const { temp, feels_like, temp_min, temp_max, humidity } = weatherData.main;
    const { main, description, icon } = weatherData.weather[0];
    const { name } = weatherData;

    const insertQuery = `
      INSERT INTO mariadb.weather_readings 
      (farenheit, feels_like, temp_min, temp_max, humidity, name, conditions, description, icon, lat, lon) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    console.log("Weather data:", [temp, feels_like, temp_min, temp_max, humidity, name, main, description, icon, lat, lon]);

    // Insert data into the database using async/await
    const [results] = await db.query(insertQuery, [
      temp, feels_like, temp_min, temp_max, humidity, name, main, description, icon, lat, lon
    ]);

    console.log("Weather data saved to database:", results);

  } catch (error) {
    console.error("Error fetching or saving weather data:", error);
  }
};

export default fetchWeatherData;
