/*
 * config express
 */
var express = require('express')
  	, compression = require('compression')
	, logger = require('morgan')
	, cookieParser = require('cookie-parser')
	, bodyParser = require('body-parser')
	, session = require('express-session')
	, methodOverride = require('method-override')
	, mongoStore = require('connect-mongo')(session);

module.exports = function (app, config, passport) {
  	app.use(compression({
  		threshold: 1024
  	}))
  	app.use(logger());
  	app.use(express.static(config.root + '/public'))

  	// set views path, template engine and default layout
  	app.set('views', config.root + '/app/views')
  	app.set('view engine', 'ejs')
  	//app.use(express.bodyParser({uploadDir:config.root + '/public'}));
  app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
	// cookieParser should be above session
	app.use(cookieParser());
	// bodyParser should be above methodOverride
	app.use(methodOverride());

    // express/mongo session storage
    app.use(session({
      	secret: 'testmorehealth',
      	resave: true,
      	saveUninitialized: true,
      	store: new mongoStore({
        	url: config.db,
        	auto_reconnect: true,
        	collection : 'sessions'
      	})
    }));

    	// use passport session
    	app.use(passport.initialize());
    	app.use(passport.session());
    	require('./routes')(app, passport);
		/// catch 404 and forward to error handler
		app.use(function(req, res, next) {
    		var err = new Error('Not Found');
    		err.status = 404;
    		next(err);
		});
    	/// error handlers

		// development error handler
		// will print stacktrace
		if (app.get('env') === 'development') {
    		app.use(function(err, req, res, next) {
        		res.status(err.status || 500);
        		res.json({message: err.message});
        		// res.render('error', {
          //   		message: err.message,
          //   		error: err
        		// });
    		});
		}

		// production error handler
		// no stacktraces leaked to user
		app.use(function(err, req, res, next) {
    		res.status(err.status || 500);
    		res.render('error', {
        		message: err.message,
        		error: {}
    		});
		});
    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')) return next()

      // log it
      console.error(err.stack)

      // error page
      req.session = null; // do not setup a session cookie on 500
      res.status(500);
      if( req.path.indexOf('/api') != 0 )
          render('500', { error: err.stack })
    })

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
      req.session = null; // do not setup a session cookie on 404
      res.status(404).render('404', { url: req.originalUrl })
    })

}
module.exports.express = express;
