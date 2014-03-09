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
  isVoteJson: function(req, res){
    res.json(handle.isVote(req));
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
