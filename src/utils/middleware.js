const logger = require("./logger");
const session = require("express-session");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

// middleware to test if authenticated
const isAuthenticated = (req, res, next) => {
  console.log("req.session.user", req.session.user);
  if (req.session.user) next();
  else
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Unauthorized",
      error: "Veillez vous authentifier pour continuer !",
    });
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  isAuthenticated,
};
