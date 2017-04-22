/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/

var uuid = require('uuid');

module.exports = {
  schema: true,
  
  attributes: {
    id: {
			type: 'string',
			unique: true,
			required: true,
			primaryKey: true,
			defaultsTo: function () {
        return uuid.v4().split('-').join('');
			}
		},

    firstname: 'string',

    lastname: 'string',

    username: 'string',

    facebookId: 'string',

    location: 'string',

    gender: {
      type: 'string',
      defaultsTo: 'not provided'
    },

    jwt_token: 'string',

    comments: {
      collection: 'comment',
      via: 'user'
    }

  }
};

