const impactCalc = (currentlyInfected, data) => {
  let days = null;
  const time = data.timeToElapse;
  if (data.periodType === 'days') {
    days = time;
  }
  if (data.periodType === 'weeks') {
    days = time * 7;
  }
  if (data.periodType === 'months') {
    days = time * 30;
  }

  const { region, totalHospitalBeds } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  const factor = Math.trunc(days / 3);
  const infectionsByRequestedTime = currentlyInfected * 2 ** factor;
  const servereCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  const beds = 0.35 * totalHospitalBeds - servereCasesByRequestedTime;
  const hospitalBedsByRequestTime = Math.trunc(beds);
  const casesForICUByRequestTime = Math.trunc(0.5 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestTime = Math.trunc(0.02 * infectionsByRequestedTime);
  const avgLoss = infectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation * days;
  const dollarsInFlight = avgLoss;
  const result = {
    currentlyInfected,
    infectionsByRequestedTime,
    servereCasesByRequestedTime,
    hospitalBedsByRequestTime,
    casesForICUByRequestTime,
    casesForVentilatorsByRequestTime,
    dollarsInFlight
  };
  return result;
};


const covid19ImpactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const currentServereInfected = data.reportedCases * 50;
  const result = {
    data,
    impactCalc: impactCalc(currentlyInfected, data),
    servereImpact: impactCalc(currentServereInfected, data)
  };
  return result;
};

export default covid19ImpactEstimator;
