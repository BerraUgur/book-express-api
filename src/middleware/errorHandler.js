const { logEvents } = require("./logEvents");

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  const errorMessage = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvents(errorMessage, "errLog.log");
  console.error(err.stack);
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
