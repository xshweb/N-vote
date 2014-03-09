var path = require('path');

function Path(args) {
  this.base = args.base || path.dirname(__dirname);
  this.set_path(args);
}
Path.prototype.set_path = function(args){
  var self = this;
  ['config', 'controllers', 'public', 'views', 'models'].forEach(function(val){
    self[val] = path.join(self.base, (args[val] || val))+'/';
  });
};
Path.prototype.toString = function(){
  return this.base;
};

var settings = {
  title      : "广西民族大学首届随手拍大赛 网上投票",
  host       : 'http://localhost:3000/',
  prefix     : 'xsh-rimgs-vote',
  path       : new Path({}),
  port       : process.env.NODE_PORT || 3000,
  root: function(){
    return this.host + this.prefix;
  },
  url: function(u){
    return this.root() + u;
  },
  init: function(app){
    app.set('view engine', 'jade');
    app.locals.title = this.title;
    app.locals.root = this.root();
    app.locals.path = this.path;
    app.locals.url = this.url;
  }
};

module.exports = settings;
