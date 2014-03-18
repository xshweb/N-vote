var handle = {
  isVote: function(req){
    // TODO
    // return req.cookies.is_vote === 1 ||
      // req.session.is_vote === 1;
  },
  vote: function(req, res){
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
      handle.vote(req, res);
    }
  },
  isVoteJson: function(req, res){
    // res.json(handle.isVote(req));
  },
  vote: function(req, res){
    // handle.vote(req.param('imgs_id'), req, res);
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
