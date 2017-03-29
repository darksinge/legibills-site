var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_ID_RMB = process.env.FACEBOOK_ID_RMB;
const FACEBOOK_SECRET_RMB = process.env.FACEBOOK_SECRET_RMB;

var facebookConfig = {
	clientID: process.env.FACEBOOK_ID_RMB || '265204003925383',
    clientSecret: process.env.FACEBOOK_SECRET_RMB || '4c527a1e12f23770233bc020a3b61263',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}

function onFacebookAuth(accessToken, refreshToken, profile, done) {
	console.log(profile);
	// User.findOne({ facebookId: query.facebookId }).exec(function (err, user) {
		
	// });
	return done(new Error("This route hasn't been implemented"));
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