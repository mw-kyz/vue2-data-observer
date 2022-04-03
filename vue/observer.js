import defineReactiveData from "./reactive"
import { arrMethods } from './array'
import observeArr from "./observeArray"

function Observer (data) {
  // 数组的对象的处理方式不一样，需要分开处理
  if (Array.isArray(data)) {
    // 重写给data的原型赋值，使其可以使用重写之后的数组方法
    data.__proto__ = arrMethods
    // 给数组的每一项设置监听
    observeArr(data)
  } else {
    this.walk(data)
  }
}

Observer.prototype.walk = function (data) {
  let keys = Object.keys(data)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i],
        value = data[key]

    defineReactiveData(data, key, value)
  }
}

export default Observer

