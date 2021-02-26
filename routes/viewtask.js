var database = require('../public/database/database.json');
var fs = require('fs');

/*
 * GET add task page.
 */

exports.view = function(req, res){
	res.render('viewtask');
};