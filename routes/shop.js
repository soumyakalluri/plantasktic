var database = require('../public/database/plantinventory.json');
var userDatabase = require('../public/database/test.json');
var fs = require('fs');
var userToLookFor;
var data;

/*
 * GET shop page.
 */
exports.view = function(req, res){
	// console.log(database);
    
    var pathURL = req.path.split('/');
	userToLookFor = pathURL[2];
	console.log(userToLookFor);
	
    data = {
        'plantInventory': database,
        'username': userToLookFor
    };

    // console.log(data);

	res.render('shop', data);
};

exports.purchasedPlant = function(req, res) {
    console.log(req.body);
    let users = JSON.stringify(req.body);
    fs.writeFileSync('./public/database/test.json', users);

	console.log(userToLookFor);
    // console.log(data);

    res.render('shop', data);
}