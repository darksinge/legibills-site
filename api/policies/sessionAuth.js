/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

  if (req.session.authenticated) {
    return next();
  } 
  
  var jwt_token = req.cookies.jwt_token || req.param('jwt');
  if (jwt_token) {
    var user = jwt.verify(jwt_token, sails.config.jwt.jwt_secret);
    if (AuthService.compareTokens(user, jwt_token)) return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
