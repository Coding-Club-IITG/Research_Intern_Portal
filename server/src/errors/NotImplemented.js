const BaseError = require("./BaseErrors");
const { StatusCodes } = require("http-status-codes");
class NotImplemented extends BaseError {
  constructor(methodName) {
    super(
      "not-implemented",
      StatusCodes.NOT_IMPLEMENTED,
      `${methodName} not implemented`,
      { s: "f" },
    );
  }
}
module.exports = NotImplemented;
