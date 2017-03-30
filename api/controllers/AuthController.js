var passport = require('passport');

module.exports = {

    facebookAuth: (req, res) => {
        return passport.authenticate('facebook')(req, res);
    },

    facebookCallback: (req, res) => {
        // passport.authenticate('facebook', {
        //     failureRedirect: '/login',
        //     successRedirect: '/profile'
        // })(req, res);
        passport.authenticate('facebook', (err, user, info) => {
            if (info) console.log('Info:: ', info);
            if (err) { console.log(err); return res.negotiate(err); }
            if (!user) return res.forbidden('User not found!');
            console.log('User: ', user);
            req.logIn(user, (err) => {
                if (err) return res.negotiate(err);
                return res.redirect('/profile');
            });
        })(req, res);
    }

}