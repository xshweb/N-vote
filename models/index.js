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

    a0   : Number,
    a1   : Number,
    a2   : Number,
    a3   : Number,
    a4   : Number,
    a5   : Number,
    at   : String,

    b0   : Number,
    b1   : Number,
    b2   : Number,
    b3   : Number,
    b4   : Number,
    bt   : String,

    c0   : Number,
    c1   : Number,
    c2   : Number,
    c3   : Number,
    c4   : Number,
    ct   : String,

    d0   : Number,
    d1   : Number,
    d2   : Number,
    d3   : Number,
    d4   : Number,
    dt   : String,

    e0   : Number,
    e1   : Number,
    e2   : Number,
    e3   : Number,
    e4   : Number,
    et   : String,

    ip   : String,
    time : Date
  }, {
    cache: false
  });
  // models.vote.hasOne('imgs', models.imgs, {reverse: 'votes'});
  next();
};
