/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res) => {
        if (req.user) {
            console.log(req.user);
            req.session.userId = req.user.facebookId;
            req.logIn(req.user, (err) => {
                if (err) return res.negotiate(err);
                return res.view('homepage');
            });
        } else {
            return res.forbidden("You are not logged in!");
        }
    },

    profileJSON: (req, res) => {
        console.log("User: ", req.user);
        if (req.session) {
            console.log("Session: ", req.session);
            console.log("Session.userId: " + req.session.userId);
        }
        if (req.user) {
            return res.json(req.user);
        }
        return res.forbidden("You are not logged in!");
    }

};

