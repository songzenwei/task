// 三、基于下面提供的代码，完成后续的四个练习
const fp = require("lodash/fp");

const { MayBe, Container } = require("./support.js");
let maybe = MayBe.of([5, 6, 1]);

// 1. 使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
let ex1 = (x) => {
  let num = 0;
  fp.map((val) => (num = fp.add(num, val)), x);
  return num;
};
//测试
let value1 = maybe.map((x) => ex1(x))._value; //12
console.log(value1); //12






//2.实现一个函数ex2，能够使用fp.first 获取列表的第一个元素
let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "to"]);
let ex2 = fp.first;
//测试
let value2 = xs.map((x) => ex2(x))._value;
console.log(value2); //do





//3.实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x, o) {
  return MayBe.of(o[x]);
});





let user = { id: 2, name: "Albert" };
let ex3 = fp.first;
// 测试
let value3 = safeProp("name", user).map((x) => ex3(x))._value;
console.log(value3); //A

//4.使用MayBe重写ex4，不要有if语句
// const ex4 = function (n) {
//   if (n) {
//     return parseInt(n);
//   }
// };
const ex4 = function (n) {
  return MayBe.of(n).map((n) => parseInt(n));
};

let value4 = ex4(null)._value;
console.log(value4); //null  有问题 实在不知道不写判断类的代码改怎么实现
