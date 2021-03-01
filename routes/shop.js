var database = require('../public/database/plantinventory.json');
var userDatabase = require('../public/database/test.json');
var fs = require('fs');

/*
 * GET shop page.
 */
exports.view = function(req, res){
	console.log(database);
	
    var plantInventory = [];
    console.log("Loading plant inventory...");
    for (var idx in database.plants) {
        var plant = database.plants[idx];
        plantInventory.push(plant);
    }
    // console.log("Finished loading inventory: " + plantInventory);

	res.render('shop', database);
};

exports.purchasedPlant = function(req, res) {
    console.log(req.body);
    let users = JSON.stringify(req.body);
    fs.writeFileSync('./public/database/test.json', users);
    res.end();
    // res.render('garden', database);
    res.redirect('../garden');
}