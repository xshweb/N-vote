var express = require('express');
var crypto = require('crypto');
var orm = require('orm');
var path = require('path');

var utils = {
  path: function(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift(process.cwd());
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
  },
  verifycode: function(cb){
    var Canvas = require('canvas');
    var canvas = new Canvas(100, 30),
    ctx = canvas.getContext('2d'),
    items = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split(''),
    vcode = '',
    textColors = [
      '#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60',
      '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b',
      '#9b59b6', '#8e44ad', '#34495e', '#2c3e50', '#428bca', '#5cb85c',
      '#5bc0de', '#f0ad4e', '#d9534f'
    ];

    ctx.fillStyle = '#bfd5fa';
    ctx.fillRect(0, 0, 100, 30);
    ctx.font = 'bold 30px sans-serif';

    ctx.globalAlpha = 0.8;
    for (var i = 0; i < 4; i++) {
      var rnd = Math.random();
      var item = Math.round(rnd * (items.length - 1));
      var color = Math.round(rnd * (textColors.length - 1));
      ctx.fillStyle = textColors[color];
      ctx.fillText(items[item], 5 + i*23, 25);
      vcode += items[item];
    }

    canvas.toBuffer(function(err, buf){
      cb(err, vcode.toLowerCase(), buf);
    });
  },
};

module.exports = utils;
