/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

let jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

  if (req.session && req.session.authenticated) {
    return next();
  }

  AuthService.authorize(req, (err) => {
    if (err) {
      if (err.message) err = err.message
      sails.log.error(err);
      return res.forbidden(err);
    }
    return next();
  });

  // return res.forbidden('You are not permitted to perform this action.');
};
