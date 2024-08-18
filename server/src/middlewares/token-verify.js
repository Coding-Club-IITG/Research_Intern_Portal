import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  if (!token) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  try {
    const jwtSecret = 'fdgt4t93xzc3252523';
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default verifyJWT;
