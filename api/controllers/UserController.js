/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function print(text, args) {
    if (!args) return console.log(text);
    return console.log(text, args);
}

var passport = require('passport');

module.exports = {
	index: (req, res) => {
        if (req.user) {
            return res.view('homepage');
        } else {
            return res.forbidden("You are not logged in!");
        }
    },

    profileJSON: (req, res) => {
        var token = req.param('jwt');
        if (!token) return res.status(403).json({
            error: "User not authorized!"
        });
        User.findOne({jwt_token:token}).exec((err, user) => {
            if (err) return res.status(403).json(err);
            if (!user) return res.status(403).json({error: "User not found!"});
            return res.json({
                user: user.toJSON()
            });
        });
    }

};

