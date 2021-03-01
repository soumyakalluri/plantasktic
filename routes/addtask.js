var fs = require('fs');

/*
 * GET add task page.
 */

exports.view = function(req, res){
	res.render('addtask');
};

exports.addedTask = function(req, res) {
    console.log(req.body);
    let users = JSON.stringify(req.body);
    fs.writeFileSync('./public/database/test.json', users);
    // res.end();
    // res.render('garden', database);
    res.redirect('../');
}