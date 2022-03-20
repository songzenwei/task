class Vue {
  constructor(option) {
    // 1. 通过属性保存选项的数据
    this.$option = option;
    this.$el = typeof option.el==='string' ? document.querySelector(option.el) : option.el ;
    this.$data = option.data;
    // 2. 把data中的属性转换成getter setter 注入到vue实例
    this._proxyData(this.$data);
    // 3. 调用observer对象，监听属性的变化
    new Observer(this.$data)
    // 4. 调用compiler对象，监听指令和差值表达式
    new Compiler(this)
  }
  _proxyData(data) {
    //遍历data中的所有属性
    Object.keys(data).forEach((key) => {
      //把data中的属性注入到vue实例
      Object.defineProperty(this, key, {
        enumerable: true, //是否可枚举/遍历
        configurable: true, // 是否可配置
        get() {
          return data[key];
        },
        set(newValue) {
          if (data[key] === newValue) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}
