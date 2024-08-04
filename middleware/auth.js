const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {return res.status(401).json({ status: 401, message: 'No token provided', });}

  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ status: 401, message: 'Invalid Token', });
  }
};
