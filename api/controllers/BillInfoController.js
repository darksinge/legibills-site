/**
* `BillController.js`
*/

module.exports = {
	
	billInfo: function(req, res){
		var year = req.params.year;        
		var name = req.params.id;
		
		BillInfo.findOrCreate({
			name: name,
			year: year
		},{
			name: name,
			year: year
		}).exec(function(err, bill) {
			if (err) {
				sails.log.error(err);
				return res.json({error: err.message});
			}
			
			return res.json(bill.toJSON());        
		});
	},
	
	upvote: (req, res) => {
		var name = req.params.name;
		var year = req.params.year;
		var user = req.user;

		if (!user) return res.forbidden('user not logged in.');

		BillInfo
		.findOrCreate({name: name, year: year}, {name: name, year: year})
		.populate('upvoteUsers')
		.populate('downvoteUsers')
		.populate('neutralvoteUsers')
		.exec((err, bill) => {
			if (err) return res.status(500).json({error: err.message});
			if (!bill) return res.status(404).json({error: "bill not found"});
			
			bill.upvoteUsers.add(user.id);
			bill.neutralvoteUsers.remove(user.id);
			bill.downvoteUsers.remove(user.id);

			bill.save((err) => {
				if (err) return res.status(500).json({error: err.message});
				BillInfo.findOne({id: bill.id})
				.populate('upvoteUsers')
				.populate('downvoteUsers')
				.populate('neutralvoteUsers')
				.exec((err, bill) => {
					return res.json({
						id: bill.id,
						name: bill.name,
						year: bill.year,
						upvotes: bill.upvoteUsers.length,
						downvotes: bill.downvoteUsers.length,
						neutralVotes: bill.neutralvoteUsers.length
					});
				});
			});
		});
	},

	downvote: (req, res) => {
		var name = req.params.name;
		var year = req.params.year;
		var user = req.user;

		if (!user) return res.forbidden('user not logged in.');

		BillInfo
		.findOne({name: name, year: year})
		.populate('upvoteUsers')
		.populate('downvoteUsers')
		.populate('neutralvoteUsers')
		.exec((err, bill) => {
			if (err) return res.status(500).json({error: err.message});
			if (!bill) return res.status(404).json({error: "bill not found"});

			bill.upvoteUsers.remove(user.id);
			bill.neutralvoteUsers.remove(user.id);
			bill.downvoteUsers.add(user.id);
			
			bill.save((err) => {
				if (err) return res.status(500).json({error: err.message});
				BillInfo.findOne({id: bill.id})
				.populate('upvoteUsers')
				.populate('downvoteUsers')
				.populate('neutralvoteUsers')
				.exec((err, bill) => {
					return res.json({
						id: bill.id,
						name: bill.name,
						year: bill.year,
						upvotes: bill.upvoteUsers.length,
						downvotes: bill.downvoteUsers.length,
						neutralVotes: bill.neutralvoteUsers.length
					});
				});
			});
		});
	},

	neutralvote: (req, res) => {
		var name = req.params.name;
		var year = req.params.year;
		var user = req.user;

		if (!user) return res.forbidden('user not logged in.');

		BillInfo
		.findOne({name: name, year: year})
		.populate('upvoteUsers')
		.populate('downvoteUsers')
		.populate('neutralvoteUsers')
		.exec((err, bill) => {
			if (err) return res.status(500).json({error: err.message});
			if (!bill) return res.status(404).json({error: "bill not found"});

			bill.upvoteUsers.remove(user.id);
			bill.neutralvoteUsers.add(user.id);
			bill.downvoteUsers.remove(user.id);

			bill.save((err) => {
				if (err) return res.status(500).json({error: err.message});
				BillInfo.findOne({id: bill.id})
				.populate('upvoteUsers')
				.populate('downvoteUsers')
				.populate('neutralvoteUsers')
				.exec((err, bill) => {
					return res.json({
						id: bill.id,
						name: bill.name,
						year: bill.year,
						upvotes: bill.upvoteUsers.length,
						downvotes: bill.downvoteUsers.length,
						neutralVotes: bill.neutralvoteUsers.length
					});
				});
			});
		});
	},
	
	reset: function(req, res){
		var year = req.params.year;        
		var name = req.params.id;
		
		BillInfo.findOne({
			name: name,
			year: year
		}).exec(function(err, bill) {
			if (err) {
				sails.log.error(err);
				return res.json({error: err.message});
			}
			
			if (!bill) {
				return res.json("Bill not found.");        
			}            
			
			bill.happyVotes = 0;
			bill.mehVotes = 0;
			bill.angryVotes = 0;
			
			bill.save(function(err) {            
				if (err) sails.log.error(err);            
			});
			
			return res.json(bill.toJSON());        
		});
	}
};