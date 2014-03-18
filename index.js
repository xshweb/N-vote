var express = require('express');
var colors = require('colors');
var routes = require('./config/routes');
var settings = require('./config/settings');
var utils = require('./utils');
var FileSessionStore = require('connect-session-file');

module.exports.start = function(){
  var app = express();

  app.use(express.urlencoded());
  app.use(express.cookieParser());
  app.use(express.session({
    cookie: {
      maxAge: 3600000
      // * 24 * 1000
    },
    secret: 'W9ERT480F9Qp526Y1dsf3',
    store: new FileSessionStore({
      path: 'data/session'
    })
  }));

  utils.models(app);
  settings.init(app);
  routes(app);

  app.listen(settings.port, function () {
    console.log(("Listening on port " + settings.port).green);
  }).on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
      console.log('Address in use. Is the server already running?'.red);
    }
  });
};

module.exports.start();
