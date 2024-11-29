
// Arduino Language

#include <DHT.h>

#define DHTTYPE DHT11
#define DHTPIN 2
#define INTERVAL 600000

DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600); // Initialize serial communication
  dht.begin();        // Initialize DHT sensor
}

void loop()
{
  digitalWrite(LED_BUILTIN, HIGH);
  
  float celsius = dht.readTemperature();
  float farenheit = dht.readTemperature(true);
  float humidity = dht.readHumidity();

  if (isnan(farenheit) || isnan(humidity) || isnan(celsius))
  {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  send_serial_data(farenheit, celsius, humidity);
  
  digitalWrite(LED_BUILTIN, LOW);
  
  delay(INTERVAL);
}

void send_serial_data(float f, float c, float h)
{
  // Send data
  Serial.print("FARENHEIT:");
  Serial.print(f);
  Serial.print(", CELSIUS:");
  Serial.print(c);
  Serial.print(", HUMIDITY:");
  Serial.println(h);
}
