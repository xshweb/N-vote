var settings = {
<<<<<<< HEAD
  title      : "2013年－－2014年广西民族大学新闻摄影大赛",
  host       : 'http://localhost:3000/',
=======
  title      : "随手拍网上投票",
  host       : 'http://localhost:3000',
>>>>>>> core
  prefix     : 'pic-vote',
  port       : process.env.NODE_PORT || 3000,
  init: function(app){
    app.set('view engine', 'jade');
    app.locals.title = this.title;
    app.locals.root = [this.host, this.prefix].join('/');
    // app.locals.path = this.path;
    app.locals.url = function (){
      return app.locals.root + '/' + Array.prototype.join.call(arguments, '/');
    };
  }
};

module.exports = settings;
