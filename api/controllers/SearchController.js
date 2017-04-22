var fakeData = {
    results: [
        {
            id: 1,
            rank: 0.99,
            title: "Bill 1",
            description: "This is bill numero uno, it is very bill-like"
        },
        {
            id: 2,
            rank: 0.7,
            title: "Bill 2",
            description: "This is the second bill. It's not quite as cool as bill number 1."
        },
        {
            id: 3,
            rank: 0.25,
            title: "Bill 3",
            description: "This is the third bill. It sucks."
        }
    ]
}

module.exports = {
    /**
     * This route currently only returns a garbage response, but one day it
     * will be the means of returning search results for our dear end users.
     * 
     */
    search: (req, res) => {

        var query = req.param('i like cats');

        var results = SearchService.search(query);

        return res.json({
            results: results
        });
    }
}