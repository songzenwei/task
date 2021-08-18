const PENDING = "pending"; // 等待
const FULFILLED = "fulfilled"; // 成功
const REJECTED = "rejected"; // 失败

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(e);
    }
  }
  // promsie 状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  //成功回调
  successCallback = [];
  //失败回调
  failCallback = [];

  resolve = (value) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    //判断成功回调是否存在
    // if(this.failCallback)this.failCallback(this.value)
    while (this.successCallback.length) this.successCallback.shift()();
  };
  reject = (reason) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    //判断失败回调是否存在
    while (this.failCallback.length) this.failCallback.shift()();
  };
  then = (successCallback, failCallback) => {
    successCallback = successCallback ? successCallback : (value) => value;
    failCallback = failCallback ? failCallback : (reason) => reason;

    let promsie2 = new MyPromise((resolve, reject) => {
      //判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            //回调执行过程中错误捕获
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promsie对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromoise(promsie2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promsie对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromoise(promsie2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              //回调执行过程中错误捕获
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve
              // 如果是promise对象 查看promsie对象返回的结果
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromoise(promsie2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promsie对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromoise(promsie2, x, resolve, reject);
          });
        });
      }
    });
    return promsie2;
  };
  static all(array) {
    let result = [];
    function addData(key, value) {
      result[key] = value;
    }
    return new Promise((resolve, reject) => {
      for (let i = 0; i < array.length; i++) {
        const current = array[i];
        if (current instanceof MyPromise) {
          //promise 对象
          current.then(
            (value) => {
              addData(i, value);
            },
            (reason) => {
              reject(reason);
            }
          );
        } else {
          //普通值
          addData(i, array[i]);
        }
      }
      resolve(result);
    });
  }

  static resolve(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      (reason) => {}
    );
  }
}

function resolvePromoise(promsie2, x, resolve, reject) {
  if (promsie2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  if (x instanceof MyPromise) {
    //promise
    x.then(resolve, reject);
  } else {
    //普通值
    resolve(x);
  }
}


