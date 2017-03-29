var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_ID_RMB = process.env.FACEBOOK_ID_RMB;
const FACEBOOK_SECRET_RMB = process.env.FACEBOOK_SECRET_RMB;

var facebookConfig = {
	clientID: process.env.FACEBOOK_ID_RMB || '265204003925383',
    clientSecret: process.env.FACEBOOK_SECRET_RMB || '4c527a1e12f23770233bc020a3b61263',
    callbackURL: "http://localhost:1337/oauth/facebook/callback"
}

function parseFirstName(profile) {
	if (profile.name && profile.name.givenName) return profile.name.givenName;
	if (profile._json && profile._json.name && typeof profile._json.name === 'string') {
		try {
			return profile._json.name.split(' ')[0];
		} catch (e) {
			return "";
		}
	}
	return "";
}

function parseLastName(profile) {
	if (profile.name && profile.name.givenName) return profile.name.givenName;
	if (profile._json && profile._json.name && typeof profile._json.name === 'string') {
		try {
			return profile._json.name.split(' ')[1];
		} catch (e) {
			return "";
		}
	}
	return "";
}

function onFacebookAuth(accessToken, refreshToken, profile, done) {

	var newUser = {
		facebookId: profile.id,
		username: profile.username || profile.displayName || '',
		firstname: parseFirstName(profile),
		lastname: parseLastName(profile),
		gender: profile.gender
	}

	User.findOrCreate({ facebookId: profile.id}, newUser).exec((err, createdOrFoundUsers) => {
		if (err) return done(err);
		if (Array.isArray(createdOrFoundUsers)) {
			return done(null, createdOrFoundUsers[0])
		}
		return done(null, createdOrFoundUsers);
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