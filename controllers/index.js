var handle = {
  login: function(stu_id, pwd, req){
    var proxy = require('kingo');
    var kingo = new proxy({
      'baseUrl': 'http://ams.gxun.edu.cn'});
    kingo.login(stu_id, pwd, function(err, flag){
      if (!err && flag) {
        req.session.stu_id = stu_id;
      }
    });
  },
  isLogin: function(req){
    return 'stu_id' in req.session;
  },
  voteNum: function(req, cb){
    // var _ = require('lodash-node');
    var orm = require('orm');
    require('date-utils');
    req.models.vote.count({
      ip: req.ip,
      time: orm.between(Date.today().getTime(), Date.tomorrow().getTime())
    }, function(err, count){
      cb(count);
      // cb(_.max([count, req.session.voteNum, req.cookies.voteNum]));
    });
  },
  voteAdd: function(req, res){
    if (typeof req.session.voteNum == 'number') {
      req.session ++;
    } else {
      req.session = 1;
    }
    if (typeof req.cookies.voteNum == 'number') {
      res.cookie('voteNum', req.cookies.voteNum+1);
    } else {
      res.cookie('voteNum', 1);
    }
  },
  vote: function(id, req, res){
    var self = this;
    if (id) {
      this.voteNum(req, function(count){
        if (count < 2) {
          req.models.vote.create([{
            stu_id: '', // XXX
            imgs_id: id,
            ip: req.ip,
            time: (new Date()).getTime()
          }], function(err, items){
            if (!err) {
              // self.voteAdd(req, res);
              res.json(1 - count);
            } else {
              res.json(0);
            }
          });
        } else {
          res.json(-1);
        }
      });
    } else {
      res.json(0);
    }
  }
};

module.exports = {
  index: function(req, res) {
    // XXX
    // if have 1000 picture, loading process is crazy!
    req.models.imgs.find({},
      { limit: 1000 }, ['id', 'Z'],
      function(err, imgs){
      if (!err) {
        res.render('index/index', { imgs: imgs });
      } else {
        res.render('404');
      }
    });
  },
  login: function(req, res){
    res.render('index/login');
  },
  voteNum: function(req, res){
    handle.voteNum(req, function(count){
      res.json(count);
    });
  },
  vote: function(req, res){
    handle.vote(req.param('imgs_id'), req, res);
  },
  vote_count: function(req, res){
    req.models.vote.count({'imgs_id': req.params.id}, function(err, count){
      res.json(count);
    });
  },
  login_post: function(req, res){
  },
  isLoginJson: function(req, res){
    res.json(handle.isLogin(req));
  },
};
