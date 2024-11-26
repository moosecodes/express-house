import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'; // Import ReadlineParser explicitly
import { db } from '../services/utils.js';


// Main function to fetch and handle climate data
const fetchClimateData = async () => {
  const path = await getSerialPortPath();

  if (!path) {
    console.error('Cannot proceed without a valid serial port.');
    return;
  }

  // Configure serial port
  const serialPort = new SerialPort({
    path,                           // Use the dynamically retrieved path
    baudRate: 9600,                 // Match the baud rate of your Arduino
  }).on('error', (error) => {       // Log any errors
    console.error('Error:', error);
  });

  // Readline parser for serial data
  const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

  // Listen for data from the serial port
  parser.on('data', (line) => {
    console.log('Received:', line);

    const [farenheit, celsius, humidity] = line.split(',').map(metric => {
      return parseFloat(metric.split(':')[1]);
    });

    if (!isNaN(farenheit) && !isNaN(celsius) && !isNaN(humidity)) {
      insertClimateData(farenheit, celsius, humidity);
    } else {
      console.log('Invalid data received:', line);
    }
  });
};
  // Function to dynamically get the serial port
  async function getSerialPortPath() {
    try {
      const ports = await SerialPort.list(); // Get the list of available ports

      // Example logic: Match a specific device (adjust based on your criteria)
      const targetPort = ports.find(port => port.vendorId === '2341' && port.productId === '8036' && port.manufacturer === 'Arduino LLC');

      if (targetPort) {
        return targetPort.path;
      } else {
        console.error('Target serial device not found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching serial ports:', error);
      return null;
    }
  }

  // Function to handle and insert data into DB
  async function insertClimateData(farenheit, celsius, humidity) {
    try {
      const query = 'INSERT INTO mariadb.dht11_readings (farenheit, celsius, humidity) VALUES (?, ?, ?)';
      await db.query(query, [farenheit, celsius, humidity]);
    } catch (error) {
      console.error('Error inserting climate data:', error);
    }
  }


export default fetchClimateData;
