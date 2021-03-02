var fs = require('fs');

/*
 * GET add task page.
 */

exports.view = function(req, res){
	res.render('addtask');
};