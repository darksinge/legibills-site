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

        User.update({id: user.id}, {jwt_token: encodedToken}).exec((err, user) => {
            if (err) sails.log.error(err);
        });

        return token;
    },

    compareTokens: (user, token) => {
        return bcrypt.compareSync(token, user.user.jwt_token);
    }

}
