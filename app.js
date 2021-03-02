/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

// routes
var index = require('./routes/index');
var addtask = require('./routes/addtask');
var error = require('./routes/error');
var login = require('./routes/login');
var signup = require('./routes/signup');
var shop = require('./routes/shop');
var garden = require('./routes/garden');
var viewtask = require('./routes/viewtask');
var profile = require('./routes/profile');

// initialize app
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', login.view);
app.get('/signup', signup.view);

// app.get('/home', index.view);
app.get('/home/:user', index.loadUser);
app.post('/home/:user', index.saveUser);

app.get('/addtask/:user', addtask.view);
// app.post('/checkofftask', index.deleteTask);

app.get('/viewtask', viewtask.view);

app.get('/error', error.view);

app.get('/shop/:user', shop.view);
app.post('/purchasedPlant/:user', shop.purchasedPlant);

app.get('/garden/:user', garden.view);

app.get('/profile/:user', profile.view);
// Example route
// app.get('/users', user.list);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});