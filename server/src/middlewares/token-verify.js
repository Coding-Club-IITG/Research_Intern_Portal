import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
<<<<<<< HEAD
    return res.status(403).json({ message: "Forbidden: No token provided" });
=======
    return res.status(403).json({ status: "error", message: "Forbidden: No token provided", data: null });
>>>>>>> Dhruv
  }

  try {
    const jwtSecret = "fdgt4t93xzc3252523";
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
<<<<<<< HEAD
    res.status(401).json({ message: "Unauthorized: Invalid token" });
=======
    res.status(401).json({ status: "error", message: "Unauthorized: Invalid token", data: null });
>>>>>>> Dhruv
  }
};

export default verifyJWT;
