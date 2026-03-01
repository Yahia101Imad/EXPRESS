const customError = require("../utils/customError");

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrack: error.stack,
    error: error,
  });
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

const castErrorHandler = (error) => {
  return new customError(
    `Invalid value for ${error.path}: '${error.value}'`,
    400,
  );
};

const duplicateKeyErrorHandler = (error) => {
  return new customError(
    `This movie name in already existing '${error.keyValue.name}', Please try another name`,
    400,
  );
};

const validationErrorHandler = (error) => {
  const errors = Object.values(error.errors).map(val => val.message)
  return new customError(`Invalid input data: ${{errors}}`, 400);
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  }
  if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyErrorHandler(error);
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    prodErrors(res, error);
  }
};
