const UserService = require('../services/user-service');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;

    const payload = UserService.verifyToken(token);
  
    req.user = {
      id: payload.id,
      displayName: payload.display_name,
      email: payload.email,
      userToken: payload.user_token,
    };

    next();
  } catch(error) {
    next(error);
  }
};
