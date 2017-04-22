/**
* `CommentController.js`
*/

module.exports = {
    
    comments: (req, res) => {
        var billId = req.params.bill;
        
        Comment.find({
            where: { billId: billId },
            sort: {
                createdAt: 1,
                updatedAt: 0
            }
        })
        .exec((err, comments) => {
            if (err) sails.log.error(err);
            
            if (!comments) {
                return res.json({comments: []});
            }
            
            comments = comments.map((value) => {
                return value.toJSON ? value.toJSON() : value;
            });
            
            return res.json({
                comments: comments
            });
        });
        
    },

    create: (req, res) => {
        var comment = req.params.comment;

        if (!comment.bill || !comment.user || !comment.body) {
            return res.status(400).json({ error: "Missing parameter(s). Comment object should have properties 'bill', 'user', 'body'" });
        }

        Comment.create(comment).exec((err, comments) => {
            if (err) sails.log.error(err);
            
            if (!comments) {
                return res.status(400).json({
                    error: "Failed to create new comment. Make sure the comment object has been configured correctly."
                });
            }

            return res.json({
                comment: comments[0]
            });
        });

    }
    
}