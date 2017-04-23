/**
* `CommentController.js`
*/

module.exports = {
    
    billComments: (req, res) => {
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
    
    create: (req, res) => {
        var comment = req.body.comment;
        
        try {
            if (!comment) comment = JSON.parse(req.body);
        } catch (e) {
            return res.status(400).json({
                info: "Failed to parse comment object. Are you sending using 'Content-Type': 'application/json'?",
                error: e.message ? e.message : e
            });
        }
        
        
        if (!comment.bill || !comment.user || !comment.body || !comment.bill.id || !comment.bill.year) {
            return res.status(400).json({
                error: "Missing parameter(s). Make sure you're sending a 'comment' object that has been configured correctly.",
                exampleCommentObject: {
                    "bill": {
                        "id": "<bill id>",
                        "year": "<bill year>"
                    },
                    "user": "<user id>",
                    "body": "<comment text>"
                }
            });
        }
        
        const bill = {
            name: comment.bill.id,
            year: comment.bill.year
        };
        
        Bill.findOrCreate(bill, bill).exec((err, bill) => {
            if (err) sails.log.error(err);
            if (Array.isArray(bill)) throw new Error("'bill' is an array.");
            
            const recordToCreate = {
                user: comment.user,
                body: comment.body,
                bill: bill.id
            };
            
            Comment.create(recordToCreate).exec((err, comments) => {
                if (err) sails.log.error(err);
                
                if (!comments) {
                    return res.status(400).json({
                        error: "Failed to create new comment. Make sure you're sending a 'comment' object that has been configured correctly.",
                        exampleCommentObject: {
                            "bill": {
                                "id": "<bill id>",
                                "year": "<bill year>"
                            },
                            "user": "<user id>",
                            "body": "<comment text>"
                        }
                    });
                }
                
                return res.json({
                    comment: comments
                });
            });
        })
        
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