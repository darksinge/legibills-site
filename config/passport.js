var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_ID_RMB = process.env.FACEBOOK_ID_RMB;
const FACEBOOK_SECRET_RMB = process.env.FACEBOOK_SECRET_RMB;

var facebookConfig = {
	clientID: FACEBOOK_ID_RMB,
    clientSecret: FACEBOOK_SECRET_RMB,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}

function onFacebookAuth(accessToken, refreshToken, profile, done) {
	
	User.findOne({ facebookId: query.facebookId }).exec(function (err, user) {
		
	});
}

passport.serializeUser(function(user, done) {
	return done(null, user.facebookId);
});

passport.deserializeUser(function(facebookId, done) {
	User.findOne({facebookId: facebookId}).exec(function(err, user) {
		if (err) return done(err);
		if (!user) return done(new Error('user is undefined'));
		return done(null, user);
	});
});

passport.use(new FacebookStrategy(facebookConfig, onFacebookAuth));

module.exports.passport = passport;