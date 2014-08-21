module.exports = function (app, passport) {

    var user = require('../app/controllers/user');

    app.get('/', function(req, res){
      res.json({message:'SERVER STATUS OK'});
    });

    app.get('/test', function(req, res){
      res.render('test');
    });
    app.post('/api/user/signup', user.create);
    app.post('/api/user/login', passport.authenticate('local', { failureRedirect: '/loginfail'}), user.login);
    app.get('/api/loginfail', user.loginfail);
    app.post('/api/user/test', user.test);

    app.get('/api/user/profile', user.getInfo);

}