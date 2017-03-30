var passport = require('passport');

module.exports = {

    facebookLogin: (req, res) => {
        return passport.authenticate('facebook')(req, res);
    },

    facebookAuthCallback: (req, res) => {
        passport.authenticate('facebook', {
         failureRedirect: '/login',
         successRedirect: '/'
      })(req, res);
    }

}