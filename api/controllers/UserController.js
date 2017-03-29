/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	profile: (req, res) => {
        return res.view('homepage', {
            user: req.user.toJSON()
        });
    }
};

