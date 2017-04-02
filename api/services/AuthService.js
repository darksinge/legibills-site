/**
 * `AuthService`
 * -----------------------
 */
var jwt = require('jsonwebtoken');

var jwt_secret = sails.config.jwt.jwt_secret;

module.exports = {

    getToken: (user) => {
        if (user.toJSON) user = user.toJSON();
        return jwt.sign({user: user}, jwt_secret);
    }

}