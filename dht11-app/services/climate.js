import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline'; // Import ReadlineParser explicitly
import db from '../utils/database.js';

// Global variable to store the serial port and parser
let serialPort = null;
let parser = null;

// Main function to fetch and handle climate data
const fetchClimateData = async () => {
  // Only attempt to find and open the serial port if it doesn't exist yet
  if (!serialPort) {
    const path = await getSerialPortPath();

    if (!path) {
      console.error('Cannot proceed without a valid serial port.');
      return;
    }

    console.info('Serial port found:', path);

    // Configure serial port (only create it once)
    serialPort = new SerialPort({
      path,                           // Use the dynamically retrieved path
      baudRate: 9600,                 // Match the baud rate of your Arduino
    }).on('error', (error) => {       // Log any errors
      console.error('Error:', error);
    });

    // Readline parser for serial data
    parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

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
  }
};

// Function to dynamically get the serial port
async function getSerialPortPath() {
  try {
    const ports = await SerialPort.list();
    
    // Look for ports that are likely to be Arduino devices
    const arduinoPorts = ports.filter(port => 
      // Check for common Arduino-related characteristics
      port.manufacturer?.toLowerCase().includes('arduino') ||
      port.vendorId === '2341' ||  // Arduino's USB vendor ID
      port.productId === '8036' || // A common Arduino board product ID
      port.path.includes('/dev/tty.usbmodem') ||  // macOS pattern
      port.path.includes('/dev/usb.usbmodem') ||  // macOS pattern
      port.path.includes('/dev/ttyACM')           // Linux pattern
    );

    if (arduinoPorts.length > 0) {
      console.log('Potential Arduino ports found:', arduinoPorts.map(p => p.path));
      return arduinoPorts[0].path;  // Return the first matching port
    } else {
      console.error('No Arduino device found.');
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
    console.log('Climate data inserted successfully.');
  } catch (error) {
    console.error('Error inserting climate data:', error);
  }
}

export default fetchClimateData;
