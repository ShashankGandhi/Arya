const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  // Get token from header
  const auth__token = req.header('Authorization');
  //Check if token exists
  if (!auth__token) {
    return res.status(400).json({
      status: 'failure',
      reason: 'Token not found',
    });
  }
  
  else {
    try {
      const finalToken = auth__token;
      const decoded = await jwt.verify(finalToken, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user.id);
      next();
    } catch (err) {
      console.error('error while verifying token', err);
      res.status(401).json({
        status: 'failure',
        reason: 'Unauthorized!',
      });
    }
  }
};

module.exports = {
  auth
};
