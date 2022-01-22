// 获取 Mongoose
const mongoose = require('mongoose');
const nanoid = require("nanoid").nanoid;

// 定义一个模式
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  age: Number,
  avatar:String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
