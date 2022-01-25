var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("./auth");
var session = require("express-session");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { mongoDB } = require("./db/connection");
const MongoDBStore = require("express-mongodb-session")(session);
const store = new MongoDBStore({
  uri: mongoDB,
  collection: "loginusers",
});

const corsConfig = {
  origin: "*",
};
var app = express();
//require("./tools/makeUser");
app.use(cors(corsConfig));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    key: "users_cookie",
    secret: "users",
    store: store,
    resave: true,
    saveUninitialized: true,
    cookie: {
      name: "userauth",
      path: "/",
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 24 * 30,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
