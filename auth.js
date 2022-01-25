var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const User = require("./modles/User");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});
passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    function (username, password, done) {
      User.findOne({ username: username, password: password }).then((user) => {
        if (!user) {
          return done(null, false, { message: "用户不存在" });
        }
        if (user) {
          return done(null, user, { message: "登陆成功" });
        }
      });
    }
  )
);

module.exports = passport;
