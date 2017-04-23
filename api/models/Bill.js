/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/

var uuid = require('uuid');

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

        toJSON: () => {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
        }
        
    }
};

