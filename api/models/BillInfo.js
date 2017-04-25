/**
* BillInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/

module.exports = {
    schema: true,
    
    attributes: {
        
        id: {
			type: 'integer',
			unique: true,
			primaryKey: true,
			autoIncrement: true
		},
        
        name: {
            type: 'string',
            required: true
        },
        
        year: {
            type: 'string',
            required: true
        },
        
        comment: {
            collection: 'comment',
            via: 'bill'
        },

        upvoteUsers: {
            collection: 'user',
            via: 'upvotes',
            dominant: true
        },

        neutralvoteUsers: {
            collection: 'user',
            via: 'neutralvotes',
            dominant: true
        },

        downvoteUsers: {
            collection: 'user',
            via: 'downvotes',
            dominant: true
        },

        toJSON: function(){
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            // obj.upvotes = this.upvoteUsers.length || 0;
            // obj.downvotes = this.downvoteUsers.length || 0;
            // obj.neutralvoteUsers = this.name.length || 0;
            return obj;
        }
        
    }
};

