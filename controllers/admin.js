var handle = {
  login: function(admin, req){
      req.session.admin = admin;
  },
  isLogin: function(req){
    return 'admin' in req.session;
  },
  getId: function(req){
    return req.session.admin.id;
  }
};


module.exports = {
  // 分页功能
  index: function(req, res){
    var offset = req.params.offset || 0;
    req.models.imgs.find({},
      { offset: offset, limit: 1000 }, ['id', 'Z'],
      function(err, imgs){
      if (!err) {
        res.render('admin/index', { imgs: imgs });
      } else {
        res.render('404');
      }
    });
  },
  login: function(req, res) {
    res.render('admin/login');
  },
  login_post: function(req, res){
    var md5 = require('../utils').md5;
    req.models.admin.find(
      { usr: req.param('usr'), pwd: md5(req.param('pwd')) }, 1,
      function(err, admin){
        if (!err && admin.length == 1) {
          handle.login(admin[0], req);
          res.jump('admin');
        } else {
          res.render('admin/login', {
            error: true
          });
        }
      });
  },
  isAdmin: function(req, res, next) {
    if (handle.isLogin(req)) {
      next();
    } else {
      res.jump('admin/login');
    }
  },
  upload: function(req, res){
    res.render('admin/upload');
  },
  upload_post: function(req, res){
    var multiparty = require('multiparty');
    var path = require('path');
    var fs = require('fs');
    var form = new multiparty.Form({
      maxFilesSize: 10 * 1024 * 1024,
      uploadDir: 'public/upload'
    });
    form.parse(req, function(err, fields, files) {
      var image = files.image[0];
      console.log(fields);
      if (image.fieldName === 'image') {
        req.models.imgs.create([{
          name: path.basename(image.path),
          title : fields.title[0],
          description : fields.description[0]
        }], function(err, items){
          if (err) {
            items.forEach(function(it){
              fs.unlinkSync('public/upload/'+it.name);
            });
            res.jump('admin/error');
          }
          res.jump('admin');
        });
      }
    });
  },
  edit: function(req, res){
    var id = req.params.id;
    req.models.imgs.get(id, function(err, img){
      res.render('admin/edit', { img: img });
    });
  },
  edit_post: function(req, res){
    req.models.imgs.get(req.params.id, function(err, img){
      img.title = req.param('title');
      img.description = req.param('description');
      img.save(function(err){
        res.render('admin/edit', {
          img: img,
          msg: '修改成功'
        });
      });
    });
  },
  delete: function(req, res){
    req.models.imgs.get(req.params.id, function(err, img){
      res.render('admin/delete', { img: img });
    });
  },
  delete_post: function(req, res){
    req.models.imgs.get(req.params.id, function(err, img){
      img.remove(function(err){
        if (!err) {
          var fs = require('fs');
          if (fs.existsSync('public/upload/'+img.name)) {
            fs.unlinkSync('public/upload/'+img.name);
          }
          res.jump('admin/index');
        }
      });
    });
  },
  password: function(req , res){
    res.render('admin/password', { msg: req.params.msg });
  },
  password_post: function(req, res){
    var md5 = require('../utils').md5;
    req.models.admin.get(handle.getId(req), function(err, admin){
      if (md5(req.param('old_pwd')) === admin.pwd) {
        admin.pwd = md5(req.param('new_pwd'));
        admin.save(function(err){
          if (!err)
            res.jump('admin/password/修改成功');
        });
      } else {
        res.jump('admin/password/密码错误');
      }
    });
  }
};
