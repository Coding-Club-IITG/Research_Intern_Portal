import BaseError from "../errors/BaseErrors.js";

function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: "false",
      message: err.description,
      details: err.details,
      data: {},
    });
  }
  return res.status(404).json({
    success: "false",
    message: "something unexpected happenend",
    details: "Nothing to show",
    data: {},
  });
}

export default errorHandler;