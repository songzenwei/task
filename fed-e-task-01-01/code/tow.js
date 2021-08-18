// 二、基于以下代码完成下面的四个练习
const _ = require("lodash");
const fp = require("lodash/fp");
//数据
// horsepower 马力 doolar_value  in_stock 库存
const cars = [
  {
    name: "Ferrari FF",
    horsepower: 660,
    doolar_value: 700000,
    in_stock: true,
  },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    doolar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    doolar_value: 132000,
    in_stock: false,
  },
  {
    name: "Audi R8",
    horsepower: 525,
    doolar_value: 114200,
    in_stock: false,
  },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    doolar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani HUayra",
    horsepower: 700,
    doolar_value: 1300000,
    in_stock: false,
  },
];

// 1.使用函数组合fp.flowRight()重新实现下面这个函数
let isLastInStock = function (cars) {
  //获取最后一条数据
  let last_car = fp.last(cars);
  //获取最后一条数据的 in_stock 属性值
  return fp.prop("in_stock", last_car);
};

let lastKey = fp.flowRight(fp.prop("in_stock"), fp.last);
console.log(lastKey(cars));

// 2.使用fp.flowRight(),fp.prop()和fp.first()获取第一个car的name
let getName = fp.flowRight(fp.prop("name"), fp.first);
console.log(getName(cars));

//3.使用帮助函数_average重构averageDollarVaule，使用函数组合的方式实现
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length;
}; //<- 无须改动

let averageDollarValue = function (cars) {
  let doolar_values = fp.map(function (car) {
    return car.doolar_value;
  }, cars);
  return _average(doolar_values);
};

let average = _.curry(_average);
let myAverageDollarValue = fp.flowRight(
  average,
  fp.map((car) => car.doolar_value)
);
console.log(averageDollarValue(cars));

// 4.使用flowRight 写一个sanitizeName()函数，返回一个下划线连接的小写字符串，把数组中name转换为这种形式，例如 写一个sanitizeName(['Hellow Word'] => ["hellow_word"])
// 转字符串  转小写  正则匹配替换
let _underscore = fp.replace(/\W+/g, "_");
let underscore = _.curry(_underscore);
let sanitizeName = fp.flowRight(underscore, fp.toLower, fp.join(","));
console.log(sanitizeName(["Hellow Word"]));
