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
    description : String,
    name        : String
  }, {
    cache: false
  });
  models.vote = db.define("vote", {
    id   : Number,
    f0   : Number,
    f1   : Number,
    f2   : Number,
    f3   : Number,
    f4   : Number,
    f5   : Number,
    f6   : Number,
    f7   : Number,
    f8   : Number,
    f9   : Number,
    f10  : Number,
    ip   : String,
    time : Date
  }, {
    cache: false
  });
  // models.vote.hasOne('imgs', models.imgs, {reverse: 'votes'});
  next();
};
