/**
 * Module dependencies.
 */

// mongoose setup
// require( './db' );

var express = require('express');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var static = require('serve-static');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));


var routes = require('./routes');


//Routes
app.get( '/', routes.index );

app.use(static(path.join(__dirname, 'public')));

//development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});


