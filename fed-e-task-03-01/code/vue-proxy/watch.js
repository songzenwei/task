class Watch {
  constructor(vm, key, cb) {
    this.vm = vm;
    //data 的属性名称
    this.key = key;
    //回调函数个责更新视图
    this.cb = cb;

    //把watch 对象记录到Dep类的静态属性target中
    Dep.target = this;
    //触发get方法，在get方法中会调用addSub
    this.oldValue = this.vm[this.key];
    //清空Dep静态属性，防止重复添加
    Dep.target = null;
  }
  //当数据变化的时候更新视图
  update() {
    let newValue = this.vm[this.key];
    if (this.oldValue === newValue) {
      return;
    }
    this.cb(newValue);
  }
}
