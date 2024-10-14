import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json({ status: "error", message: "Forbidden: No token provided", data: null });
  }

  try {
    const jwtSecret = "fdgt4t93xzc3252523";
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ status: "error", message: "Unauthorized: Invalid token", data: null });
  }
};

export default verifyJWT;
