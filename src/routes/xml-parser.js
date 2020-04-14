const Parser = require('fast-xml-parser').j2xParser;

const parser = new Parser();
module.exports = parser;
const winston = require('winston');

const path = require('path');

const appRoot = path.dirname(require.main.filename);
const options = {
  file: {
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: false,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    handleExceptions: false,
    json: false,
    colorize: true
  }
};
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});
logger.stream = {
  write(message) {
    logger.log(`${message}ms`);
  }
};

module.exports = logger;
