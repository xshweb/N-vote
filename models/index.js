module.exports = function(db, models, next){
  models.admin = db.define("admin", {
    id  : Number,
    usr : String,
    pwd : String
  }, {
    cache: false
  });
  models.imgs = db.define("imgs", {
    id          : Number,
    title       : String,
    description : String,
    name        : String
  }, {
    cache: false
  });
  models.vote = db.define("vote", {
    id      : Number,
    stu_id  : String,
    imgs_id : Number,
    ip      : String,
    time    : Date
  }, {
    cache: false
  });
  models.vote.hasOne('imgs', models.imgs, {reverse: 'votes'});
  next();
};
