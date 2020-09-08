// 实现数据监听
// 使用object.defineProperty的作用主要是起到监听数据变化的作用
// 当数据变化时，肯定要通知xx，如果不通知别人，监听是没有意义的
// 订阅：就是把函数（函数中有具体的逻辑）放到一个容器中
// 发布：就是将这个容器中的函数都执行，实现具体的逻辑
// 在哪里订阅，在哪里发布？
// 订阅是一个分散的过程，比如，我希望数据发生变化的时候执行(就是发布的意思)某个逻辑
// 就可以在初始化数据的时候订阅，等数据发生变化的时候发布

/**
 * 
   一个数据： 可能在页面中有多个位置使用这个数据(肯定不止一个位置使用这个数据)，那么，
   如果这个数据发生变化了，页面更新的地方肯定也是不止一个地方，也就是说，所有使用这个数据
   的地方(模板的某个地方)，都需要被通知，让这些地方更新
   - 一个dep对应多个watcher
   - 一个watcher对应多个dep
   - 因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，
     然后在监听器Observer和订阅者Watcher之间进行统一管理的
 */

/**
 * 给对象的某个属性添加监听
 * @param {*} obj 目标对象
 * @param {*} key 属性key
 * @param {*} value 属性的值
 */
function defineReactive(obj, key, val) {
  // val可能也是一个对象
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('访问了属性' + key);
      return val
    },
    set: function (newVal) {
      if (val !== newVal) {
        console.log('属性' + key + '被改变了');
        // newVal可能也是一个对象
        observe(newVal)
        val = newVal;
      }
    }
  })
}
function observe(data) {
  // 非对象不监听
  if (!data || typeof data !== 'object') return;
  // 遍历对象监听对象的属性
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // 监听该属性
      defineReactive(data, key, data[key])
    }
  }
}

let obj = {
  name: 'zf',
  body: {
    s1: 100,
    s2: 200
  }
}
observe(obj)
obj.body.s1 = 'zf'
console.log(obj.name);