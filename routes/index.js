var database = require('../database.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
	console.log(database);
	res.render('index', database);
};