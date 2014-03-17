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
  isVote: function(req){
    return req.cookies.is_vote === 1 ||
      req.session.is_vote === 1;
  },
  vote: function(id, req, res){
    if (id && !this.isVote(req)) {
      req.models.vote.create([{
        stu_id: '', // XXX
        imgs_id: id,
        ip: req.ip,
        time: (new Date()).getTime()
      }], function(err, items){
        if (!err) {
          req.session.is_vote = 1;
          res.cookie('is_vote', 1);
          res.json(true);
        } else {
          res.json(false);
        }
      });
    } else {
      res.json(false);
    }
  },
  is_verifycode: function(req){
    return req.session.verifycode == req.param('verifycode');
  }
};

module.exports = {
  index: function(req, res) {
    res.render('index/index', {
      data: require('./index/data.js')
    });
  },
  index_post: function(req, res){
    var error = function(info){
      res.render('index/index', {
        data: require('./index/data.js'),
        error: info
      });
    };
    if (!handle.is_verifycode(req)) {
      return error('验证码错误');
    } else {
      // XXX move to handle
      var v = {};
      for (var i=0; i < 11; ++i) {
        if (req.param('f'+i)) {
          v['f'+i] = parseInt(req.param('f'+i));
        } else {
          return error('第'+(i+1)+'个选项未填写');
        }
      }
      v.ip = req.ip;
      v.time = (new Date()).getTime();
      req.models.vote.create([v], function(err, items){
        if (!err) {
          res.jump('success');
        }
      });
    }
  },
  isVoteJson: function(req, res){
    res.json(handle.isVote(req));
  },
  vote: function(req, res){
    handle.vote(req.param('imgs_id'), req, res);
  },
  verifycode: function(req, res){
    var utils = require('../utils');
    utils.verifycode(function(err, code, buf){
      if (!err) {
        req.session.verifycode = code;
        res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': buf.length });
        res.end(buf);
      }
    });
  },
};
