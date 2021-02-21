var database = require('../public/database/database.json');

/*
 * GET add task page.
 */

exports.view = function(req, res){
	res.render('addtask');
};