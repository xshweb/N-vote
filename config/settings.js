var settings = {
  title      : '广西民族大学后勤服务满意度问卷调查',
  host       : 'http://localhost:3000',
  prefix     : 'text-vote',
  port       : process.env.NODE_PORT || 3000,
  init: function(app){
    app.set('view engine', 'jade');
    app.locals.title = this.title;
    app.locals.root = [this.host, this.prefix].join('/');
    app.locals.url = function (){
      return app.locals.root + '/' + Array.prototype.join.call(arguments, '/');
    };
  }
};

module.exports = settings;
