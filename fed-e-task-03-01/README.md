一、简答题

1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

let vm = new Vue({
    el: '#el'
    data: {
    o: 'object',
    dog: {}
    },
    method: {
    clickHandler () {
    // 该 name 属性是否是响应式的
    this.dog.name = 'Trump'
    }
    }
})

# 通过 this.dog.name = 'Trump' 给 dog 增加的成员 不是响应式数据。

# 可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property。还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名。

# 原理是：类似于调用 defineReactive(obj, key, val) 方法，利用 Object.defineProperty 的 getter 和 setter 实现响应式数据。

2、请简述 Diff 算法的执行过程

# diff 是找 同级别 的 子节点 依次比较，然后再找下一级别的节点比较。

# 首先在进行同级别节点比较的时候，首先会对新旧节点数组的 开始 和 结尾 节点设置标记索引，遍历的过程中移动索引；索引标记为：

# oldStartIdx/ newStartIdx(旧开始节点索引 / 新开始节点索引)

# oldEndIdx/ newEndIdx(旧结束节点索引 / 新结束节点索引)

# 对应的节点为：

# ldStartVnode / newStartVnode (旧开始节点 / 新开始节点)

# oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)

# **开始 ** 和 结尾 点的比较依次按下面步骤进行

# 如果 oldStartVnode 和 newStartVnode 是 sameVnode (key 和 sel 相同)，调用 patchVnode() 对比和更新节点，把 旧开始 和 新开始 索引往后移动 oldStartIdx++ / newStartIdx++，进入下一个循环；若不同，则进入下一个判断。

# 如果 oldEndVnode 和 newEndVnode 是 sameVnode (key 和 sel 相同)，调用 patchVnode() 对比和更新节点，把 旧结尾 和 新结尾 索引往前移动 oldEndIdx-- / newEndIdx--，进入下一个循环；若不同，则进入下一个判断。

# 如果 oldStartVnode 和 newEndVnode 是 sameVnode，即 旧开始节点 / 新结尾节点 相同，调用 patchVnode() 对比和更新节点，把 oldStartVnode 对应的 DOM 元素移动到当前标记的 oldEndVnode 对应的 DOM 元素的后面，然后更新索引 oldStartIdx++ / newEndIdx--，进入下一个循环；不同，则进入下一个判断。

# 如果 oldEndVnode 和 newStartVnode 是 sameVnode，即 旧结束节点 / 新开始节点 相同，调用 patchVnode() 对比和更新节点，把 oldEndVnode 对应的 DOM 元素移动到当前标记的 oldStartVnode 对应的 DOM 元素的前面，然后更新索引 oldEndIdx-- / newStartIdx++，进入下一个循环；不同，则进入下一步。

# 如果首尾标记节点对比都不通过，则进入如下步骤：

# 使用当前标记的 newStartVnode 的 key 在 旧节点 数组中找相同节点。

# 如果没有找到，说明 newStartVnode 是新增节点，则用 newStartVnode 创建新的 DOM 元素，插入到当前标记的 oldStartVnode 对应的 DOM 元素之前，newStartIdx++ ，进入下一个循环。

# 如果找到了，则判断 新节点 和找到的 旧节点 的 sel 选择器是否相同

# 如果相同，调用 patchVnode() 对比和更新节点，把找到的 旧节点 对应的 DOM 元素，移动到当前标记的 oldStartVnode 对应的 DOM 元素的前面， newStartIdx++ ，进入下一个循环。

# 如果不相同，说明节点被修改了，则用 newStartVnode 创建新的 DOM 元素，插入到当前标记的 oldStartVnode 对应的 DOM 元素之前，newStartIdx++ ，进入下一个循环。

# 同级对比循环结束时会有两种情况 旧节点的所有子节点先遍历完(oldStartIdx > oldEndIdx)、新节点的所有子节点先遍历完 (newStartIdx > newEndIdx)，此时需要对新旧节点数组进行后续处理：

# 如果旧节点的数组先遍历完(oldStartIdx > oldEndIdx)，说明新节点有剩余且是新创建的 Vnode，则用这些剩余节点创建新的 DOM 元素，并批量插入到当前所标记的 newEndVnode 之后的 Vnode（即标识索引为 newEndIdx+1）所对应的 DOM 元素之前，若不存在该 Vnode，则相当于插入到末尾。

# 如果新节点的数组先遍历完(newStartIdx > newEndIdx)，说明旧节点中有多余，这直接把多余节点批量删除。

二、编程题

1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
