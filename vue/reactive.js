import { observe } from "./observe"

function defineReactiveData (data, key, value) {
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

export default defineReactiveData