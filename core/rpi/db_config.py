db_config = {
    'host': 'db',  # Use the service name defined in docker-compose.yml
    'user': 'user',  # Ensure this matches the MYSQL_USER in docker-compose.yml
    'password': 'password',  # Ensure this matches the MYSQL_PASSWORD in docker-compose.yml
    'database': 'expressdb'  # Ensure this matches the MYSQL_DATABASE in docker-compose.yml
}

insert_dht11_query = "INSERT INTO expressdb.dht11_readings (farenheit, celsius, humidity) VALUES (%s, %s, %s)"