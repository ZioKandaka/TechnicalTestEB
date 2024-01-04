const express = require("express");
const response = require("../helper/response");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function ErrorHandler(err, req, res, next) {
  console.log(err);

  if (err.name === "notFound") {
    response(res, 404, false, 'Resource not found', null);
  } else if (err.name === "SequelizeValidationError") {
    response(res, 400, false, err.errors[0].message, null);
  } else if (err.name === "JoiError") {
    response(res, 400, false, err.message, null);
  } else if (err.name === "JsonWebTokenError") {
    response(res, 401, false, "Invalid token", null);
  } else if (err.name === "Unauthorized") {
    response(res, 403, false, "Unauthorized", null);
  } else if (err.name === "SequelizeUniqueConstraintError") {
    response(res, 400, false, err.errors[0].message, null);
  } else if (err.name === "AggregateError") {
    response(res, 400, false, err.errors[0].errors.errors[0].message, null);
  } else if (err.name === "InvalidCredential") {
    response(res, 401, false, "Wrong email or password", null);
  } else if (err.name === "emailRequired") {
    response(res, 400, false, "Please fill email", null);
  } else if (err.name === "passwordRequired") {
    response(res, 400, false, "Please fill password and user completely", null);
  } else if (err.name === "customError") {
    response(res, err.code, false, err.message, null);
  } else {
    response(res, 500, false, "Internal server error", null);
  }
}


module.exports = ErrorHandler;