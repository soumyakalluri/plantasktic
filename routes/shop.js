var database = require('../public/database/plantinventory.json');

/*
 * GET home page.
 */
exports.view = function(req, res){
	console.log(database);
	// First item in the database will be a default one that we will fall back on when users enter a username not found
	
	// TODO: Fix the userToLookFor
    var plantInventory = [];
    console.log("Loading plant inventory...");
    for (var idx in database.plants) {
        var plant = database.plants[idx];
        plantInventory.push(plant);
    }
    console.log("Finished loading inventory: " + plantInventory);

	res.render('shop', database);
};
