import { SerialPort, ReadlineParser } from 'serialport';
import db from '../services/utils.js';

// Configure serial port
const serialPort = new SerialPort({
  path: '/dev/ttyACM0',        // Update with your serial port path
  baudRate: 9600,              // Match the baud rate of your Arduino
});

const fetchClimateData = async () => {
  // Readline parser for serial data
  const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

  // Function to handle and insert data into DB
  async function insertClimateData(farenheit, celsius, humidity) {
    try {
      const query = 'INSERT INTO mariadb.dht11_readings (farenheit, celsius, humidity) VALUES (?, ?, ?)';
      await db.query(query, [farenheit, celsius, humidity]);
    } catch (error) {
      console.error('Error inserting climate data:', error);
    }
  }

  // Listen for data from the serial port
  parser.on('data', (line) => {
    console.log('Express received data from arduino:\n', new Date().toString() + '\n', line);
    const [farenheit, celsius, humidity] = line.split(',').map(metric => {
      return parseFloat(metric.split(':')[1]);
    })

    if (!isNaN(farenheit) && !isNaN(celsius) && !isNaN(humidity)) {
      insertClimateData(farenheit, celsius, humidity);
    } else {
      console.log('Invalid data received:', line);
    }
  });
};

export default fetchClimateData;
