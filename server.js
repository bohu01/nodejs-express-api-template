/**
 * API server.
 * -Bo Hu 
 * 06/27/2014
 */

var env = process.env.NODE_ENV || 'development'

/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
//var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var models_path = __dirname + '/app/models'
require(models_path+'/'+'user.js')
//config app, env, db, root
config = require('./config/config')[env]

mongoose.connect(config.db);
//console.log(config.root);
var app = express();

require('./config/passport')(passport);

require('./config/express')(app, config, passport);
require('./config/routes')(app, passport);


module.exports = app;
