var express = require('express');
var crypto = require('crypto');
var orm = require('orm');
var path = require('path');

var utils = {
  path: function(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift(__dirname);
    return path.join.apply(Function, args);
  },
  controllers: function(name){
    var names = name.split('.');
    var ctrl = require(
      utils.path('controllers', (names[0] || 'index')));
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
      define: require('./models/index')
    }));
  },
  md5: function(text){
    return crypto.createHash('md5').update(text).digest('hex');
  }
};

module.exports = utils;
