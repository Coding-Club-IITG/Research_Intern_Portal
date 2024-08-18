const BaseError = require("./BaseErrors");
const { StatusCodes } = require("http-status-codes");
class BadRequest extends BaseError {
  constructor(properyName, details) {
    super(
      "BadRequest",
      StatusCodes.BAD_REQUEST,
      `Invalid structure for ${properyName} provided`,
      details
    );
  }
}
module.exports = BadRequest;
//Invalid structure for description provided as in our client side one uploads qs without description it is an bad request
