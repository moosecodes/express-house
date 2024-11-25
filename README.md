### Temperature and Humidity Information Panel

![image](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)
![image](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![image](https://img.shields.io/badge/Express%20js-ffffff?style=for-the-badge&logo=express&logoColor=black)
![image](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08)

This application provides temperature and humidty information derived from a standaard DHT11 sensor, which is wired to an Arduino Leonardo microcontroller. The outside weather conditions are sourced from OpenWeatherMap's API.
As the conditions are reported and saved in the MariaDB database, Vue.js is then used to visualize this data over time by rendering the lines on a chart in real time.

Future enhancenments include:

- Adding more SHT11 sensors to get a better idea of different areas around the area where they are placed.
- Adding more information to the view to better report more weather conditions from different API calls using a selected zip code.
- Adding the ability to automatically control Phllips Hues lighting to reflect the outside temperature.
- Adding unit and end-end testing using Jest and Cypress.io
