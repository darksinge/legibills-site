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
	 		year: year,
	 		happyVotes: 0,
	 		mehVotes: 0,
	 		angryVotes: 0
    	}).exec(function(err, bill) {
    		 if (err) {
		        sails.log.error(err);
		        return res.json({error: err.message});
		      }

    		if (!bill) {
    			console.log("bill not found.");
    			return res.json("Bill not found.");        
    		}            

    		return res.json(bill.toJSON());        
    	});
	},

    vote: function(req, res) {        
    	var year = req.params.year;        
    	var name = req.params.id;
    	var voteType = req.params.votetype;
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

    		console.log("increase "+voteType);

    		if(voteType == "happy"){
    			bill.happyVotes++;
    		}else if(voteType == "meh"){
    			bill.mehVotes++;
    		}else if(voteType == "angry"){
    			bill.angryVotes++;
    		}

    		bill.save(function(err) {            
    			if (err) sails.log.error(err);            
    		});

    		return res.json(bill.toJSON());        
    	});   
    },

    decreasevote: function(req, res) {        
    	var year = req.params.year;        
    	var name = req.params.id;
    	var voteType = req.params.votetype;
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


    		if(voteType == "happy"){
    			bill.happyVotes--;
    		}else if(voteType == "meh"){
    			bill.mehVotes--;
    		}else if(voteType == "angry"){
    			bill.angryVotes--;
    		}

    		console.log("decrease "+voteType);

    		bill.save(function(err) {            
    			if (err) sails.log.error(err);            
    		});

    		return res.json(bill.toJSON());        
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