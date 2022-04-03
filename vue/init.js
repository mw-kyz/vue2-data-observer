import { proxyData } from './proxy'
import { observe } from './observe'

function initState (vm) {
  const options = vm.$options

  if (options.data) {
    initData(vm)
  }
}

function initData(vm) {
  let data = vm.$options.data

   vm._data = data = typeof data === 'function' ? data.call(vm) : (data || {})

  for (let key in data) {
    // 将 vm._data.xxx 代理到 vm 上，这样就可以直接使用 vm.xxx 获取该属性
    proxyData(vm, '_data', key)
  }

  observe(vm._data)
}

export {
  initState
}