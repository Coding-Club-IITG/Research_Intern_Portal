const BaseError = require("./BaseErrors");
const { StatusCodes } = require("http-status-codes");
class InternalServerError extends BaseError {
  constructor(details) {
    super(
      "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "something went wrong!!",
      details,
    );
  }
}
module.exports = InternalServerError;
