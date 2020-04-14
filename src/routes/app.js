const express = require('express');
const impactCalc = require('../estimator.js');
const estimator = require('../estimator.js');
const fs = require('fs');
const path = require('path');
const covidRouter = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();

/* creating a write stream */
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

/* setup logger */
app.use(morgan(':method :url :status : response_time', { stream: accessLogStream }));

covidRouter.route('/v1/on-covid-19')
  .get((req, res) => {
    const { name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation } = req.body.region;
    const { periodType, timeToElapse, reportedCases, population, totalHospitalBeds } = req.body;
    const inputData = {
      region: {
        name,
        avgAge,
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
      },
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    };

    const data = estimator(inputData);
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.send(jsonParser, data);
  });

covidRouter.route('/v1/on-covid-19/json')
  .get((req, res) => {
    const { name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation } = req.body.region;
    const { periodType, timeToElapse, reportedCases, population, totalHospitalBeds } = req.body;
    const inputData = {
      region: {
        name,
        avgAge,
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
      },
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    };

    const data = estimator(inputData);
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.json(jsonParser, data)
  });

app.post('/v1/on-covid-19/xml', (req, res) => {
  const {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = req.body.region;
  const {
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  const inputData = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
  const data = estimator(inputData);
  const xmlOutput = xmlParser.parse({
    root: data
  });
  res.set('Content-Type', 'application/xml');
  res.status(200);
  res.send(xmlOutput);
});
app.get('/v1/on-covid-19/logs', (req, res) => {
  res.status(200);
  res.sendFile(`${appRoot}/logs/app.log`);
});
app.get('/v1/on-covid-19/json', (req, res) => {
  res.status(200);
  res.sendFile(`${appRoot}/logs/app.log`);
});
app.get('/v1/on-covid-19/xml', (req, res) => {
  res.status(200);
  res.sendFile(`${appRoot}/logs/app.log`);
});
app.get('/logs', (req, res) => {
  res.status(200);
  res.sendFile(`${appRoot}/logs/app.log`);
});
exports.getLogs = (req, res) => {
  res.status(200);
  res.sendFile(`${appRoot}/logs/app.log`);
};
app.post('/json', (req, res) => {
  const inputData = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };
  const output = impactCalc(data);
  res.type('application/json');
  res.status(200).json(output);
  const data = estimator(inputData);
  res.status(200).json(data);
});

app.use('/api', covidRouter);
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

