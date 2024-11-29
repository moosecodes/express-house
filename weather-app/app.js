// import expressListEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv/config';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import climateRouter from './routes/climate.js';
import weatherRouter from './routes/weather.js';

import fetchWeatherData from './services/weather.js';
import fetchClimateData from './services/climate.js';

const app = express();

// view engine setup
app.set('views', path.join(path.dirname(''), 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(''), 'public')));

app.use('/', indexRouter);
app.use('/api/climate', climateRouter);
app.use('/api/weather', weatherRouter);

// console.log(expressListEndpoints(app));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Function to start readings
const startReadings = () => {
  fetchWeatherData();
  setInterval(fetchWeatherData, process.env.WEATHER_FETCH_INTERVAL);

  fetchClimateData();
  setInterval(fetchClimateData, process.env.WEATHER_FETCH_INTERVAL);
};

startReadings();

export default app;
