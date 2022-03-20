class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    // 1.判断data是否是对象
    if (!data || typeof data != "object") {
      return;
    }
    // 2.遍历对象中的所有属性
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(obj, key, val) {
      let that = this
      // 负责收集依赖，并发送通知
      let dep = new Dep()
    //如果val 是对象,把val内部的属性转换成响应式对象
    this.walk(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
          //收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val;
      },
      set(newValue) {
        if (val === newValue) {
          return;
        }
        val = newValue;
        that.walk(val)
        //发送通知
        dep.notify()
      },
    });
  }
}
