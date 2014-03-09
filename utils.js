var express = require('express');
var path = require('./config/settings').path;
var crypto = require('crypto');
var orm = require('orm');

module.exports = {
  controllers: function(name){
    var names = name.split('.');
    var ctrl = require(
      path.controllers+(names[0] || 'index'));
    var method = names[1] || 'index';
    return ctrl[method];
  },
  views: function(name, args){
    return function(req, res){
      if (args) {
        return res.render(name, args);
      } else {
        return res.render(name);
      }
    };
  },
  models: function(app){
    app.use(orm.express("sqlite:data/data.db", {
      define: require(path.models+'index')
    }));
  },
  md5: function(text){
    return crypto.createHash('md5').update(text).digest('hex');
  }
};

