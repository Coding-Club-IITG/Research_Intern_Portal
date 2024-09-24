import BaseError from "./BaseErrors.js";
import { StatusCodes } from "http-status-codes";
class BadRequest extends BaseError {
  constructor(properyName, details) {
    super(
      "BadRequest",
      StatusCodes.BAD_REQUEST,
      `Invalid structure for ${properyName} provided`,
      details,
    );
  }
}
export default BadRequest;
//Invalid structure for description provided as in our client side one uploads qs without description it is an bad request
