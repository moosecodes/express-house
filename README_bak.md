# MooseLab Climate Monitor

### Initial setup

- Upload code to Arduino
- Wire up the arduino
- Wire up the Raspberry Pi (rpi)
- Plug in USB serial cable from arduino to rpi
- run `sudo raspi-config` on rpi terminal
- enable rpi serial connection (say no to remote console log in when doing this setup)
- (optional) enable rpi VNC via `raspi-config`
- (optional) disable boot to desktop
- install `DHT sensor library` via Arduino IDE through `Manage Extensions`
- Expand rpi filesystem through `raspi-config`
- Install `nodejs` apt package
- Install `npm`
- (optional) Install `nvm` via `npm`

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

=> Appending nvm source string to /home/moose/.bashrc
=> Appending bash_completion source string to /home/moose/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

### Add to bash profile or oh my zsh profile:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### On RPi console:

```bash
sudo apt update

sudo apt upgrade

# Install database server
sudo apt install mariadb-server

# Install mysql-connector-python
pip install mysql-connector-python

sudo mysql_secure_installation

sudo systemctl start mariadb

# Start database server on boot
sudo systemctl enable mariadb

sudo systemctl status mariadb
```

### Navigate to working folder and create Python Virtual Environment

```bash
# Create a virtual environment (if not already created)
python3 -m venv arduinoenv

# Activate the virtual environment
source arduinoenv/bin/activate

# Install dependecies
pip install -r requirements.txt
```

To freeze any new depenencies in `requrements.txt`:

```bash
pip freeze > requirements.txt
```

### Create database and table in database:

```sql
-- Access the MariaDB shell
`sudo mysql -u root -p`
`sudo mysql -u user -p`

-- Create a database
CREATE DATABASE IF NOT EXISTS mariadb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE mariadb;

-- Create a table for storing temperature and humidity
CREATE TABLE IF NOT EXISTS dht11_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    farenheit FLOAT NOT NULL,
    celsius FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


GRANT SELECT, INSERT, UPDATE, DELETE ON mariadb.* TO 'root'@'%';
FLUSH PRIVILEGES;
```

### Database credentials config

### Uncomplicated Firewall (UFW)

```bash
sudo ufw allow ssh               # Allow SSH for remote access
sudo ufw allow http              # Allow HTTP for web traffic
sudo ufw allow https             # Allow HTTPS for secure web traffic
sudo ufw allow 3306/tcp          # Allow MySQL/MariaDB if needed
sudo ufw allow 5000              # Allow express server
sudo ufw allow 5900              # Allow VNC if needed
sudo ufw default deny incoming   # Deny all other incoming connections
sudo ufw default allow outgoing  # Allow all outgoing connections
sudo ufw enable                  # Enable the firewall (this persists across reboots)
```
