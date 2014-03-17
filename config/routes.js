var express = require('express');
var utils = require('../utils');
var controllers = utils.controllers;
var settings = require('./settings');
require('express-namespace');

module.exports = function (app) {
  app.set("trust proxy", true);
  var prefix = settings.prefix;

  /* add jump method to res. redirect to real address. */
  app.use(function (req, res, next) {
    res.jump = function(/* status ,*/ url){
      if (typeof arguments[0] === 'number') {
        res.redirect(arguments[0],
          prefix + '/' + arguments[1]);
      } else {
        res.redirect(prefix + '/' + url);
      }
    };
    next();
  });

  // set static directory
  app.use('/'+prefix, express.static(utils.path('public')));

  app.namespace('/'+prefix, function(){
    app.get('/', controllers('index'));
    app.post('/', controllers('index.index_post'));
    app.get('/verifycode', controllers('index.verifycode'));
    app.get('/success', utils.views('index/success'));

    // app.get('/isVote', controllers('index.isVoteJson'));
    // app.post('/vote', controllers('index.vote'));

    var is_admin = controllers('admin.isAdmin');
    app.namespace('/admin', function(){
      app.get('/login', controllers('admin.login'));
      app.post('/login', controllers('admin.login_post'));

      app.get('/', is_admin, controllers('admin'));
      // app.get('/index/:offset?', is_admin, controllers('admin'));
      // app.get('/upload', is_admin, controllers('admin.upload'));
      // app.post('/upload', is_admin, controllers('admin.upload_post'));
      // app.get('/edit/:id', is_admin, controllers('admin.edit'));
      // app.post('/edit/:id', is_admin, controllers('admin.edit_post'));
      // app.get('/delete/:id', is_admin, controllers('admin.delete'));
      // app.post('/delete/:id', is_admin, controllers('admin.delete_post'));
      // app.get('/password/:msg?', is_admin, controllers('admin.password'));
      // app.post('/password', is_admin, controllers('admin.password_post'));
    });
  });
  app.get('*', utils.views('404'));
};
