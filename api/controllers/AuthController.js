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
            
            var token = AuthService.getToken(user);
            user.jwt_token = token;
            user.save(err => {
                if (err) {
                    sails.log.error(err);
                    return res.negotiate(err);
                }
                res.cookie('jwt_token', token);
                return res.redirect('/profile');
            });
        })(req, res);
    }
    
}