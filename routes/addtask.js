var database = require('../public/database/database.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
	res.render('addtask');
};