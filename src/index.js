import Vue from 'vue'

const vm = new Vue ({
  el: '#app',
  data() {
    return {
      title: 'studentList',
      classNum: 1,
      total: 2,
      teacher: ['zhangsan', 'lisi'],
      info: {
        a: 1,
        b: 2
      },
      students: [
        {
          id: 1,
          name: 'xiaoming'
        },
        {
          id: 2,
          name: 'xiaohong'
        }
      ]
    }
  }
})

console.log(vm)
console.log(vm.info.a)

vm.info.a = 2

console.log(vm.info.a)

vm.students.splice(0, 1, {
  a:11,
  b: 222
}, {
  c: 11,
  d: 22
})