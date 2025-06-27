import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req?.cookies?.jwt?.access_token;
  const user = req?.cookies?.user;
  console.log(token)
  const parseUser = JSON.parse(user);
  // console.log(parseUser);

  if (!token) {
    return res.status(403).json({ status: "error", message: "Forbidden: No token provided", data: null });
  }

  try {
    req.user = parseUser;
    req.user.token = token;
    next();

  } catch (err) {
    res.status(401).json({ status: "error", message: "Unauthorized: Invalid token", data: null });
  }
};

export default verifyJWT;
