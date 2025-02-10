function myNew(func, ...args) {
  let obj = Object.create(func.prototype)
  func.call(obj, ...args)
  return obj
}

const A = function (name) {
  this.name = name
}

new A('allen')

myNew(A, 'allen')
