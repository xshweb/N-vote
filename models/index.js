module.exports = function(db, models, next){
  models.admin = db.define("admin", {
    id  : Number,
    usr : String,
    pwd : String
  });
  models.imgs = db.define("imgs", {
    id          : Number,
    title       : String,
    description : String,
    name        : String
  });
  models.vote = db.define("vote", {
    id      : Number,
    stu_id  : String,
    imgs_id : Number,
    ip      : String,
    time    : Date
  });
  models.vote.hasOne('imgs', models.imgs, {reverse: 'votes'});
  next();
};
