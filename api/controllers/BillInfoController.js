/**
 * `BillController.js`
 */

module.exports = {
    upvote: function(req, res) {
        var year = req.params.year;
        var name = req.params.id;

        BillInfo.findOne({
            name: name,
            year: year
        }).exec(function(err, bill) {
            if (err) return res.json({
                error: err
            });

            // if (!bill) {
            //     BillInfo.create({

            //     })
            // }

            bill.upvotes++;
            bill.save(function(err) {
                if (err) sails.log.error(err);
            });

            return res.json(bill.toJSON());

        });

    }
};