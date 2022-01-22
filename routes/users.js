var express = require("express");
const User = require("../modles/User");
const db = require('../db/connection')
const nanoid = require("nanoid").nanoid;
var router = express.Router();

// 获取文章列表
router.get("/getuser", async function (req, res) {
  let page = req.query.page;
  let limit = req.query.pageSize || 5;
  
  User.find({},function (err, data) {
    if(err) return res.status(500).json({
        result: 1,
        error_info: '请求失败！'
    })
    let count = data.length
    
    User.find({}).skip((page - 1)*parseInt(limit)).limit(parseInt(limit)).exec(function (err, data) {
        if(err) return res.status(500).json({
            result: 1,
            error_info: '服务器繁忙，请稍后重试！'
        })
        return res.status(200).json({
            result:0,
            message:'请求成功',
            total: count,
            userList: data
        })
    })
})

});

/* GET users listing. */

module.exports = router;
