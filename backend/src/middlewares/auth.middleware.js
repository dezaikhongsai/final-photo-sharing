import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
   console.log('Cookies:', req.cookies);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
    req.user = decoded;
    next();
  });
};