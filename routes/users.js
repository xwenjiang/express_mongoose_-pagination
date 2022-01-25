var express = require("express");
const User = require("../modles/User");
const db = require("../db/connection");
const nanoid = require("nanoid").nanoid;
const { json } = require("express/lib/response");
var router = express.Router();

// 获取文章列表
router.get("/getuser", async function (req, res) {
  let page = req.query.page;
  let limit = req.query.pageSize || 5;

  User.find({}, function (err, data) {
    if (err)
      return res.status(500).json({
        result: 1,
        error_info: "请求失败！",
      });
    let count = data.length;

    User.find({})
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .exec(function (err, data) {
        if (err)
          return res.status(500).json({
            result: 1,
            error_info: "服务器繁忙，请稍后重试！",
          });
        return res.status(200).json({
          result: 0,
          message: "请求成功",
          total: count,
          userList: data,
        });
      });
  });
});
router.post("/edituser", async (req, res) => {
  const { _id, age, avatar, username } = req.body;
  const person = await User.findById(_id);
  person.age = age;
  person.avatar = avatar;
  person.username = username;
  let result = await person.save();
  res.json({
    status: "1",
    data: result,
  });
});
router.post("/deleteuser", async (req, res) => {
  const { _id } = req.body;
  const result = await User.findByIdAndDelete(_id);
  result._id
    ? res.json({ status: "1", data: result, message: "completed" })
    : res.json({ status: "0", data: null, message: "error" });
});
router.post("/adduser", async (req, res) => {
  const { username, age, avatar } = req.body;
  console.log('age',age)
  const result = await User.create({ username, age, avatar });
  result._id
    ? res.json({ status: "1", data: result, message: "completed" })
    : res.json({ status: "0", data: null, message: "error" });
});

module.exports = router;
