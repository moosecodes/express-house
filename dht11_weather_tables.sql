CREATE DATABASE IF NOT EXISTS mariadb CHARACTER
SET utf8mb4
COLLATE utf8mb4_general_ci;

USE mariadb;

-- Create a table for storing temperature and humidity
CREATE TABLE IF NOT EXISTS dht11_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fahrenheit DOUBLE NOT NULL,
    celsius DOUBLE NOT NULL,
    humidity DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Create a table for local weather data
CREATE TABLE IF NOT EXISTS weather_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farenheit FLOAT NOT NULL,
    feels_like FLOAT NOT NULL,
    temp_min FLOAT NOT NULL,
    temp_max FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    name VARCHAR(255),
    conditions VARCHAR(255),
    description VARCHAR(255),
    icon VARCHAR(255),
    lat DOUBLE NOT NULL,
    lon DOUBLE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;



GRANT SELECT, INSERT, UPDATE, DELETE ON mariadb.* TO 'user'@'%';
FLUSH PRIVILEGES;