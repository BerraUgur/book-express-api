const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// Log events to file
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "dd.MM.yyyy\tHH.mm.ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}`;
  try {
    const logsDir = path.join(__dirname, "..", "logs");
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir, { recursive: true });
    }
    await fsPromises.appendFile(path.join(logsDir, logFileName), logItem + "\n");
  } catch (err) {
    console.error("Logging error:", err);
  }
};

// Request logging middleware
const logger = (req, res, next) => {
  const message = `${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvents(message, "reqLog.log");
  next();
};

module.exports = { logEvents, logger };