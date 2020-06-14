const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ 
      errors: [{ 
        msg :"Authentication details were not provided" 
      }] 
    });
  }

  try {
    const decoded = jwt.verify(token, config.get('jsonSecret'));

    req.user = decoded.user;

    next();
    
  } catch (err) {
    return res.status(401).json({ 
      errors: [{ 
        msg :"Token is invalid" 
      }] 
    });
  }
}