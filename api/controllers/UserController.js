/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	profile: (req, res) => {
        User.find().exec((err, users) => {
            if (err) return res.negotiate(err);
            if (!users) return res.view('homepage');
            
            var user;
            if (Array.isArray(users)) {
                user = users[0];
            } else {
                user = users;
            }
            return res.view('homepage', {
                user: user
            });
        });
        
    }
};

