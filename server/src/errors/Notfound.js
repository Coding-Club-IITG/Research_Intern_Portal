const BaseError = require("./BaseErrors");

class NotFound extends BaseError {
  constructor(details) {
    super("not-found", 404, "went wrong", details);
  }
}
module.exports = NotFound;
