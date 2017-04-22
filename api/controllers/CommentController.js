/**
* `CommentController.js`
*/

module.exports = {
    
    billComments: function(req, res) {
        var billId = req.params.bill;
        
        Comment.find({
            where: { billId: billId },
            sort: {
                createdAt: 1,
                updatedAt: 0
            }
        })
        .populate('user')
        .exec(function(err, comments) {
            if (err) sails.log.error(err);
            
            if (!comments) {
                return res.json({comments: []});
            }
            
            comments = comments.map(function(value) {
                return value.toJSON ? value.toJSON() : value;
            });
            
            return res.json({
                comments: comments
            });
        });
        
    },

    create: function(req, res) {
        var comment = req.body.comment;

        if (!comment.billId || !comment.user || !comment.body) {
            return res.status(400).json({ error: "Missing parameter(s). Comment object should have properties 'bill', 'user', 'body'" });
        }

        Comment.create(comment).exec(function(err, comments) {
            if (err) sails.log.error(err);
            
            if (!comments) {
                return res.status(400).json({
                    error: "Failed to create new comment. Make sure the comment object has been configured correctly."
                });
            }

            return res.json({
                comment: comments
            });
        });

    },

    find: (req, res) => {
        Comment.find()
        .populate('user')
        .exec(function(err, comments) {
            if (err) sails.log.error(err);
            if (comments) {
                return res.json(comments.map(value => {
                    if (value.toJSON) value = value.toJSON();

                    var user = {
                        id: value.user.id,
                        username: value.user.username
                    };

                    value.user = user;

                    return value;
                }));
            }
        });
    }
    
}