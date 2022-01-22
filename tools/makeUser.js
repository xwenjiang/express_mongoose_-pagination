var Mock = require("mockjs");
const User = require("../modles/User");
var Random = Mock.Random;
(async function hello() {
  for (let index = 0; index < 100; index++) {
    await User.create({
      username: Random.cname(),
      age: Random.integer(18, 100),
      avatar:'https://picsum.photos/id/237/200/300'
    });
  }
})();
