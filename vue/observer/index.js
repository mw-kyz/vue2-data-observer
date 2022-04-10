import { newArrMethods } from './array'
import { isObject, isArray, setConstantProperty } from '../utils'

class Observer {
  constructor (data) {
    setConstantProperty(data, '__ob__', this)

    // 数组的对象的处理方式不一样，需要分开处理
    if (isArray(data)) {
      // 重写给data的原型赋值，使其可以使用重写之后的数组方法
      data.__proto__ = newArrMethods
      // 给数组的每一项设置监听
      this.observeArr(data)
    } else {
      this.walk(data)
    }
  }

  walk (data) {
    const keys = Object.keys(data)

    keys.forEach(key => {
      defineReactive(data, key, data[key])
    })
  }

  observeArr (data) {
    data.forEach(item => {
      observe(item)
    })
  }
}

function defineReactive (data, key, value) {
  // 递归处理，value有可能还是对象
  observe(value)

  Object.defineProperty(data, key, {
    get () {
      console.log('响应式数据：获取', value)

      return value
    },
    set (newValue) {
      console.log('响应式数据：设置', newValue)
      if (newValue === value)  return
      // 如果新的值是一个对象，也需要设置监听
      observe(newValue)
      // value形成了闭包，get里面返回的就是value的值，所以此处需要给value赋值，否则get返回的永远是旧值
      value = newValue
    }
  })
}

function observe (data) {
  if (!isObject(data) || data.__ob__) {
    return data
  }

  new Observer(data)
}

export {
  observe
}