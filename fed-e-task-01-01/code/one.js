// 将下面异步代码使用Promise的方式进行改进

// setTimeout(function () {
//   var a = "hellow";
//   setTimeout(function () {
//     var b = "lagou";
//     setTimeout(function () {
//       var c = "I love you";
//       console.log(a + b + c);
//     }, 1000);
//   }, 1000);
// }, 1000);

//Promise的方式
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hellow");
  }, 3000);
});

promise
  .then((value) => {
    return value + "lagou";
  })
  .then((value) => {
    return value + "I love you";
  })
  .then((value) => {
    console.log(value);
  });
