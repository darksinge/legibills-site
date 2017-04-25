/**
 * `AuthService`
 * -----------------------
 */
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

const saltRounds = 10;

let jwt_secret = sails.config.jwt.jwt_secret;

module.exports = {

  generateToken: (user) => {
    if (user.toJSON) user = user.toJSON();

    var token = jwt.sign({user: user}, jwt_secret);

    var encodedToken = bcrypt.hashSync(token, saltRounds);

    User.update({id: user.id}, {jwt_token: encodedToken}).exec((err) => {
      if (err) sails.log.error(err);
    });

    return token;
  },

  authorize: (req, next) => {
    var authToken = req.headers.authorization;

    if (!authToken && req.user) {
      authToken = req.user.jwt_token;
    }

    if (!authToken && req.params.jwt_token) authToken = req.params.jwt_token;
    if (!authToken && req.cookies.jwt_token) authToken = req.cookies.jwt_token;

    if (!authToken) {
      return next(new Error('authorization token not found.'));
    }

    let decoded = jwt.verify(authToken, sails.config.jwt.jwt_secret);

    User.findOne({id: decoded.user.id}).exec((err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error('authorization failed, user not found.'));
      if (bcrypt.compareSync(authToken, user.jwt_token)) {
        req.user = user;
        return next(null);
      }
      return next(new Error('authorization failed, token mismatch.'));
    });

  }

};
