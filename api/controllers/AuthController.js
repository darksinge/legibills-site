var passport = require('passport');

module.exports = {

    facebookAuth: (req, res) => {
        return passport.authenticate('facebook')(req, res);
    },

    facebookCallback: (req, res) => {
        passport.authenticate('facebook', {
            failureRedirect: '/login',
            successRedirect: '/profile',
            session: false
        })(req, res);
    }

}