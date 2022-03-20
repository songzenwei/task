class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  }
  //编译模版 处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        //   处理文本节点
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        //处理元素节点
        this.compileElement(node);
      }

      //判断node节点，是否有子节点，如果有子节点，要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  //编译元素节点，处理指令
  compileElement(node) {
    //遍历所有的属性节点
    Array.from(node.attributes).forEach((attr) => {
      let attrName = attr.name;
      //判断是否是指令
      if (this.isDirective(attrName)) {
        //   v-text ----->text
        attrName = attrName.substr(2);
        let key = attr.value;
        if (attrName.indexOf(':')!==-1) {
          let eventType = attrName.split(':')[1]
          this.handleEvent(this,node,eventType,key)
      }
        this.update(node, key, attrName);
      }
    });
  }

  update(node, key, attrName) {
    let updateFn = this[attrName + "Updater"];
    updateFn && updateFn.call(this, node, this.vm[key], key);
  }

  //处理v-text 指令
  textUpdater(node, value, key) {
    node.textContent = value;
    new Watch(this.vm, key, (newValue) => {
      node.textContent = newValue;
    });
  }

  //处理v-html 指令
  htmlUpdater(node, value, key) {
    node.innerHTML = value;
    debugger
    new Watch(this.vm, key, (newValue) => {
      node.innerHTML = newValue;
    });
  }

  //处理v-on 指令
  handleEvent(vm,node,eventType,eventName){
    node.addEventListener(eventType,()=>{
      vm.vm.$option.methods[eventName]()
  })
  }


  //处理v-model指令
  modelUpdater(node, value, key) {
    node.value = value;
    new Watch(this.vm, key, (newValue) => {
      node.value = newValue;
    });
    //双向绑定
    node.addEventListener("input", (e) => {
      this.vm[key] = node.value;
    });
  }

  //编译文本节点，处理差值表达式
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/;
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
      //创建watch对象，当数据改变更新视图
      new Watch(this.vm, key, (newValue) => {
        node.textContent = newValue;
      });
    }
  }
  //判断元素属性是否指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  //判断节点是否文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  //判断节点是否元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
