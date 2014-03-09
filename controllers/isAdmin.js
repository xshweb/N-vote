module.exports = function(req, res, next) {
  console.log(req.sission);
  if (('admin' in req.session) && req.session.admin === 'admin') {
    return next();
  } else {
    return res.render('login');
  }
};
