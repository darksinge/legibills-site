var passport = require('passport');

module.exports = {

    facebookAuth: (req, res) => {
        return passport.authenticate('facebook')(req, res);
    },

    facebookCallback: (req, res) => {
        passport.authenticate('facebook', (err, user, info) => {
            if (info) sails.log.info(info);
            if (err) {
                sails.log.error(err);
                return res.negotiate(err);
            }

            var authToken = AuthService.generateToken(user);
            res.cookie('jwt_token', authToken);
            res.header('Authorization', authToken);
            return res.redirect('/profile');
        })(req, res);
    }

}
