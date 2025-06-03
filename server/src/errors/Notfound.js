import BaseError from "./BaseErrors.js";

class NotFound extends BaseError {
  constructor(details) {
    super("not-found", 404, "went wrong", details);
  }
}
export default NotFound;
