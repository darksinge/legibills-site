/**
 * `UserController.js`
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

    if (!req.user) {
      return res.status(403).json({error: 'forbidden!'});
    }


    User.findOne({id: req.user.id}).exec((err, user) => {
      if (err) {
        sails.log.error(err);
        return res.json({error: err.message});
      }

      if (!user) {
        return res.json({error: 'user not found!'});
      }

      return res.json(user.toJSON());
    });


  },

  logout: (req, res) => {
    res.clearCookie('jwt_token');
    delete req.headers.authorization;
    if (req.logout) {
      req.logout();
    }
    return res.redirect('/');
  }

};
