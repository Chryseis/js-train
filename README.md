# js-train

## 目录

- [Debounce](#Debounce)

- [DeepClone](#DeepClone)

- [DynamicPlanning](#DynamicPlanning)

- [Event](#Event)

- [Format](#Format)

- [Inherit](#Inherit)

- [JsBridge](#JsBridge)

- [LuckyDraw](#LuckyDraw)

- [New](#New)

- [Promise](#Promise)

  - [promise](#promise)

  - [promiseAll](#promiseAll)

  - [promiseRace](#promiseRace)

- [ReduxMiddleware](#ReduxMiddleware)

- [Sort](#Sort)

  - [bubbleSort](#bubbleSort)

  - [quickSort](#quickSort)

- [Stack](#Stack)

- [Throttle](#Throttle)

- [Tree](#Tree)

  - [expandTree](#expandTree)

  - [findPath](#findPath)

  - [genTree](#genTree)

  - [transform](#transform)

- [Websocket](#Websocket)

## Debounce

```javascript
const debounce = (fn, delay) => {
  let timer
  let result

  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        result = fn.apply(this, arguments)
        timer = null
      }, delay)
    } else {
      result = fn.apply(this, arguments)
    }
  }
}
```

## DeepClone

```javascript
// 通过数组存储，查询访问对象
// 尾调用，提高递归效率
const deepCloneByArray = val => {
  const visitedObjs = []

  const clone = val => {
    if (val instanceof RegExp) return new RegExp(val)
    if (val instanceof Date) return new Date(val)
    if (val === null || typeof val !== 'object') return val // 简单类型

    let retVal
    let visitedObj = visitedObjs.find(({ obj }) => obj === val)
    if (!visitedObj) {
      retVal = Array.isArray(val) ? [] : {}
      visitedObjs.push({ obj: val, retVal })
      Object.keys(val).forEach(key => {
        retVal[key] = clone(val[key])
      })
      return retVal
    } else {
      return visitedObj.retVal
    }
  }

  return clone(val)
}

// 通过Map，提高搜索访问对象效率
const deepCloneByMap = val => {
  const visitedObjs = new Map()

  const clone = val => {
    if (val instanceof RegExp) return new RegExp(val)
    if (val instanceof Date) return new Date(val)
    if (val === null || typeof val !== 'object') return val // 简单类型

    let retVal
    if (!visitedObjs.has(val)) {
      retVal = Array.isArray(val) ? [] : {}
      visitedObjs.set(val, retVal)
      Object.keys(val).forEach(key => {
        retVal[key] = clone(val[key])
      })
      return retVal
    } else {
      return visitedObjs.get(val)
    }
  }

  return clone(val)
}

// WeakMap 比 Map更安全，防止Map的key不被垃圾回收
const deepCloneByWeakMap = (obj, hash = new WeakMap()) => {
  // 递归拷贝
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj === null || typeof obj !== 'object') return obj // 简单类型

  if (hash.has(obj)) return hash.get(obj) // 循环引用

  const instance = new obj.constructor()
  hash.set(obj, instance)

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      instance[key] = deepCloneByWeakMap(obj[key], hash)
    }
  }
  return instance
}

const obj = { a: 2 }
obj.b = { d: 1, c: obj, e: [1, 2, 3, obj] }
obj.b.f = obj.b.c
obj.f = obj.b.e

let start = +new Date()
console.log(deepCloneByArray(obj))
console.log(+new Date() - start, 'Array')

let start1 = +new Date()
console.log(deepCloneByMap(obj))
console.log(+new Date() - start1, 'Map')

let start2 = +new Date()
console.log(deepCloneByWeakMap(obj))
console.log(+new Date() - start2, 'WeakMap')
```

## DynamicPlanning

```javascript
/**
 * 假设你是一个专业的劫匪，你计划去打劫一条街上的家舍，每家有一定数量的钱财，
 * 但相邻两家有一个彼此连接的安全系统，一旦相邻两家在同一晚被打劫，那么这个安全系统就会自动报警。
 *
 * 给你一个由非负整数组成的数组，用来代表每家的钱财，在不让安全系统自动报警的前提下，
 * 求你能打劫到的钱财的最大数量。
 *
 * 比如 [2, 0, 0, 4, 5]，能打劫到的最大钱财是7
 */
function getMax(arr) {
  let total = 0

  while (arr.length > 0) {
    if (arr.length < 2) {
      total += arr[0]
      arr.splice(0, 1)
    } else if (arr[0] > arr[1]) {
      total += arr[0]
      arr.splice(0, 2)
    } else {
      if (arr[0] + arr[2] < arr[1]) {
        total += arr[1]
        arr.splice(0, 3)
      } else {
        total += arr[0] + arr[2]
        arr.splice(0, 4)
      }
    }
  }

  return total
}

function getMax1(arr) {
  let max = 0
  const length = arr.length
  for (let i = length - 1; i >= 0; i--) {
    const nextIndex = i + 2
    if (nextIndex > length - 1) continue
    if (nextIndex + 1 <= length - 1) {
      arr[i] =
        arr[i] + arr[nextIndex + 1] > arr[i] + arr[nextIndex] ? arr[i] + arr[nextIndex + 1] : arr[i] + arr[nextIndex]
    } else {
      arr[i] = arr[i] + arr[nextIndex]
    }
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}

const arr1 = [2, 0, 0, 4, 5, 9, 10, 11]
console.log(getMax(arr1))
const arr2 = [2, 0, 0, 4, 5]
console.log(getMax1(arr2))
```

## Event

```javascript
class Event {
  events = {}
  constructor(initEvents = {}) {
    this.events = initEvents
  }

  on(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.on(event[i], fn)
      }
    } else {
      this.events[event] = (this.events[event] || []).concat(fn)
    }
    return this
  }

  emit(event) {
    let cbs = this.events[event]
    const args = Array.from(arguments).slice(1)
    if (cbs) {
      cbs.forEach(function (cb) {
        cb.apply(this, args)
      })
    }

    return this
  }

  off(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.off(event[i], fn)
      }
    } else {
      let cbs = this.events[event]
      if (!fn) {
        this.events[event] = null
        return this
      }

      if (cbs) {
        this.events[event] = cbs.filter(cb => cb !== fn)
      }
    }

    return this
  }

  once(event, fn) {
    const on = () => {
      this.off(event, on)
      fn.apply(this, arguments)
    }

    this.on(event, on)

    return this
  }
}

const event = new Event()

const fn = () => {
  console.log('I click')
}

event.on('click', fn)

event.once('touch', function () {
  console.log('I touch')
})

event.emit('click')

event.off('click', fn)
event.emit('click')
event.emit('touch')
event.emit('touch')

export default Event
```

## Format

```javascript
//千分位格式化
const roundByFour = (num, digits) => {
  return parseFloat(num.toFixed(digits))
}

console.log(roundByFour(1000.12345678, 4))
```

## Inherit

```javascript

```

## JsBridge

```javascript
;(function () {
  const callbacks = {}

  // 如果使用iframe传值
  function renderIframe(url) {
    try {
      let iframeElem = document.createElement('iframe')
      iframeElem.setAttribute('src', url)
      iframeElem.setAttribute('style', 'display:none;')
      iframeElem.setAttribute('height', '0px')
      iframeElem.setAttribute('width', '0px')
      iframeElem.setAttribute('frameborder', '0')
      document.body.appendChild(iframeElem)
      setTimeout(() => {
        document.body.removeChild(iframeElem)
        iframeElem = null
      }, 300)
    } catch (e) {}
  }

  window.JSBridge = {
    dispatch(name, data) {
      const event = document.createEvent('Events')
      event.initEvent(name, false, true)
      event.data = data
      document.dispatchEvent(event)
    },

    invoke(bridgeName, data, callback) {
      const callbackId = `${name}_${Math.floor(Math.random() * new Date().getTime())}`
      callbacks[callbackId] = callback
      window.postBridgeMessage({
        bridgeName,
        data,
        callbackId
      })
    },

    receiveMessage(msg) {
      const { data, callbackId } = msg
      if (callbacks[callbackId]) {
        callbacks[callbackId](data)
        delete callbacks.callbackId
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.JSBridge.dispatch('myJSBridgeReady')
  })
})()
```

## LuckyDraw

```javascript
/*
请实现抽奖函数rand，保证随机性
输入为表示对象数组，对象有属性n表示人名，w表示权重
随机返回一个中奖人名，中奖概率和w成正比
*/
let peoples = [
  { n: 'p1', w: 100 },
  { n: 'p2', w: 200 },
  { n: 'p3', w: 100 }
]
const rand = function (p) {
  const ret = p.map(o => ({ ...o, score: o.w * Math.random() }))

  const max = Math.max(...ret.map(o => o.score))

  return ret.find(o => o.score === max).n
}

console.log(rand(peoples))
```

## New

```javascript

```

## Promise

### promise

```javascript
class MyPromise {
  status = 'pending'
  result = undefined

  constructor(fn) {
    let callbacks = []
    const resolve = resolveVal => {
      try {
        this.status = 'fulfilled'
        this.result = resolveVal
        if (callbacks.length > 0) {
          if (this.status !== 'pending') {
            const { resolveFn } = callbacks.splice(0, 1)[0]
            this.status = 'pending'
            resolveVal = resolveFn(resolveVal)
            queueMicrotask(() => {
              this.status = 'fulfilled'
              this.result = resolveVal
              if (resolveVal instanceof MyPromise) {
                if (resolveVal.status === 'fulfilled') {
                  resolveVal.then(function (data) {
                    resolve(data)
                  })
                } else {
                  resolveVal.then(
                    data => {},
                    err => {
                      reject(err)
                    }
                  )
                }
              } else {
                resolve(resolveVal)
              }
            })
          }
        }
      } catch (err) {
        reject(err)
      }
    }

    const reject = rejectVal => {
      this.status = 'rejected'
      this.result = rejectVal
      if (callbacks.length > 0) {
        if (this.status !== 'pending') {
          const { rejectFn } = callbacks.splice(0, 1)[0]
          this.status = 'pending'
          rejectVal = rejectFn(rejectVal)
          queueMicrotask(() => {
            this.status = 'rejected'
            this.result = rejectVal
            if (rejectVal instanceof MyPromise) {
              if (rejectVal.status === 'rejected') {
                rejectVal.then(
                  data => {},
                  err => {
                    reject(err)
                  }
                )
              } else {
                rejectVal.then(
                  data => {
                    resolve(data)
                  },
                  err => {}
                )
              }
            } else {
              reject(rejectVal)
            }
          })
        }
      }
    }

    try {
      fn(resolve, reject)
    } catch (err) {
      reject(err)
    }

    this.then = (resolveFn, rejectFn) => {
      callbacks.push({ resolveFn, rejectFn })

      if (this.status !== 'pending') {
        queueMicrotask(() => {
          if (this.status === 'fulfilled') {
            resolve(this.result)
          } else {
            reject(this.result)
          }
        })
      }

      return this
    }

    this.catch = errFn => this.then(undefined, errFn)

    this.finally = finallyFn => {
      this.then(finallyFn, finallyFn)
    }
  }
}

MyPromise.resolve = function (val) {
  return new MyPromise(resolve => {
    resolve(val)
  })
}

MyPromise.reject = function (val) {
  return new MyPromise((resolve, reject) => {
    reject(val)
  })
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 500)
})
  .then(
    data => {
      console.log(data, 'resolve')
      return new MyPromise((resolve, reject) => {
        reject(2)
      })
    },
    err => {
      console.log(err, 'reject')
      return 3
    }
  )
  .then(
    data => {
      console.log(data, 'resolve')
    },
    err => {
      console.log(err, 'reject')
    }
  )
  .catch(() => {
    console.log('err')
  })
  .finally(() => {
    console.log('finally')
  })
```

### promiseAll

```javascript
function promiseAll(arr) {
  let retVal = []
  if (arr && !arr.length) {
    console.warn('参数有问题')
  } else {
    return new Promise(resolve => {
      arr.forEach(promise => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }

        promise.then(data => {
          retVal.push(data)
          if (retVal.length === arr.length) {
            resolve(retVal)
          }
        })
      })
    })
  }
}

const promise1 = () => Promise.resolve(1)
const promise2 = () => Promise.resolve(2)
const promise3 = () => Promise.resolve(3)
const promise4 = () => Promise.resolve(4)
const promise5 = () => Promise.resolve(5)

Promise.all([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})

promiseAll([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})
```

### promiseRace

```javascript
function promiseRace(arr) {
  if (arr && !arr.length) {
    console.warn('参数有问题')
  } else {
    return new Promise(resolve => {
      arr.forEach(promise => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }

        promise.then(data => {
          resolve(data)
        })
      })
    })
  }
}

const promise1 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 1), 1000)
  })
const promise2 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 2), 3000)
  })
const promise3 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 3), 2000)
  })
const promise4 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 4), 5000)
  })
const promise5 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 5), 6000)
  })

Promise.race([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})

promiseRace([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})
```

## ReduxMiddleware

```javascript

```

## Sort

### bubbleSort

```javascript
function bubbleSort(arr) {
  let count = arr.length - 1
  while (count > 0) {
    for (let i = 0; i < count; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp
        temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
    count -= 1
  }
}

function bubbleSort2(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

let arr = [2, 1, 3, 4, 5]

bubbleSort(arr)
console.log(arr)
```

### quickSort

```javascript
function quickSort(arr) {
  const count = arr.length
  const halfIdx = Math.floor(count / 2)
  let halfNo = arr[halfIdx]

  if (halfIdx < 1) {
    return arr
  } else {
    let temp1 = []
    let temp2 = []
    arr.splice(halfIdx, 1)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < halfNo) {
        temp1.push(arr[i])
      } else {
        temp2.push(arr[i])
      }
    }
    return [...quickSort(temp1), halfNo, ...quickSort(temp2)]
  }
}

let arr = [2, 1, 9, 10, 12, 11]
console.log(quickSort(arr))
```

## Stack

```javascript
// 栈：先进后出，后进先出
class Stack {
  items = []

  push(item) {}

  pop() {}

  peek() {}

  isEmpty() {}

  size() {}

  toString() {}
}
```

## Throttle

```javascript
const throttle = (fn, delay) => {
  let startTime = +new Date()
  let first = true
  let result

  return function () {
    if (first) {
      startTime = +new Date()
      first = false
      result = fn.apply(this, arguments)
    } else {
      if (+new Date() - startTime > delay) {
        startTime = +new Date()
        result = fn.apply(this, arguments)
      }
    }

    return result
  }
}

const fn = throttle(() => {
  console.log('show', +new Date() - startTime)
  return 1
}, 1000)

let startTime = +new Date()
setInterval(() => {
  console.log(fn())
}, 100)
```

## Tree

### expandTree

```javascript
// 把一个树平铺
let tree = {
  id: 1001,
  parentId: 0,
  name: 'AA',
  children: [
    {
      id: 1002,
      parentId: 1001,
      name: 'BB',
      children: [
        { id: 1006, parentId: 1002, name: 'FF' },
        { id: 1007, parentId: 1002, name: 'GG' }
      ]
    },
    {
      id: 1003,
      parentId: 1001,
      name: 'CC',
      children: [
        {
          id: 1004,
          parentId: 1003,
          name: 'DD',
          children: [{ id: 1008, parentId: 1004, name: 'HH' }]
        },
        {
          id: 1005,
          parentId: 1003,
          name: 'EE',
          children: [{ id: 1009, parentId: 1005, name: 'II' }]
        }
      ]
    }
  ]
}

const expandTree = tree => {
  let result = []

  const expand = tree => {
    ;[tree].forEach(node => {
      result.push(node)
      if (node.children) expand(node.children)
    })

    return result
  }

  return expand(tree)
}

console.log(JSON.stringify(expandTree(tree)))
```

### findPath

```javascript
// 已知数组list，写一个函数，要求输入eg，输出ac->ce->eg.
const list = [
  {
    id: 'ab',
    children: [
      {
        id: 'cd',
        children: [
          {
            id: 'ef',
            children: []
          }
        ]
      },
      {
        id: 'fg',
        children: []
      }
    ]
  },
  {
    id: 'ac',
    children: [
      {
        id: 'ce',
        children: [
          {
            id: 'eg',
            children: []
          }
        ]
      }
    ]
  }
]

const findPath = (list, key) => {
  let result = []

  const getPath = (list, pId = '') => {
    list.forEach(node => {
      let key = `${pId ? `${pId}->` : pId}${node.id}`
      result.push(key)
      getPath(node.children, key)
    })
  }

  getPath(list)

  console.log(result)

  return result.find(str => str.indexOf(key) > -1)
}

console.log(JSON.stringify(findPath(list, 'eg')))
```

### genTree

```javascript
/**
 * 把 var list = [
 { id: 1001, parentId: 0, name: "AA" },
 { id: 1002, parentId: 1001, name: "BB" },
 { id: 1003, parentId: 1001, name: "CC" },
 { id: 1004, parentId: 1003, name: "DD" },
 { id: 1005, parentId: 1003, name: "EE" },
 { id: 1006, parentId: 1002, name: "FF" },
 { id: 1007, parentId: 1002, name: "GG" },
 { id: 1008, parentId: 1004, name: "HH" },
 { id: 1009, parentId: 1005, name: "II" }
 ]
 转化为
 {
  id: 1001,
  parentId: 0,
  name: "AA",
  children: [
    {
      id: 1002,
      parentId: 1001,
      name: "BB",
      children: [
        { id: 1006, parentId: 1002, name: "FF" },
        { id: 1007, parentId: 1002, name: "GG" }
      ]
    },
    {
      id: 1003,
      parentId: 1001,
      name: "CC",
      children: [
        {
          id: 1004,
          parentId: 1003,
          name: "DD",
          children: [{ id: 1008, parentId: 1004, name: "HH" }]
        },
        {
          id: 1005,
          parentId: 1003,
          name: "EE",
          children: [{ id: 1009, parentId: 1005, name: "II" }]
        }
      ]
    }
  ]
}
 */

const list = [
  { id: 1001, parentId: 0, name: 'AA' },
  { id: 1002, parentId: 1001, name: 'BB' },
  { id: 1003, parentId: 1001, name: 'CC' },
  { id: 1004, parentId: 1003, name: 'DD' },
  { id: 1005, parentId: 1003, name: 'EE' },
  { id: 1006, parentId: 1002, name: 'FF' },
  { id: 1007, parentId: 1002, name: 'GG' },
  { id: 1008, parentId: 1004, name: 'HH' },
  { id: 1009, parentId: 1005, name: 'II' }
]

const genTree = (arr, parentId) => {
  return arr.reduce((tree, node) => {
    if (node.parentId === parentId) {
      if (parentId === 0) {
        return { ...node, children: genTree(arr, node.id) }
      }
      return tree.concat({ ...node, children: genTree(arr, node.id) })
    }
    return tree
  }, [])
}

console.log(JSON.stringify(genTree(list, 0)))
```

### transform

```javascript
// transform({
//   0: {
//     username: '0',
//     department: 'A-B-C',
//   },
//   1: {
//     username: '1',
//     department: 'A-B-D',
//   },
//   2: {
//     username: '2',
//     department: 'A-X-Y',
//   },
// })
// // 打印结果：
//   [
//   {
//     name: 'A',
//     path: 'A',
//     children: [
//       {
//         name: '0',
//         path: 'A-B',
//         children: [
//           { name: '0', path: 'A-B-C', children: [] },
//           { name: '1', path: 'A-B-D', children: [] },
//         ],
//       },
//       { name: '2', path: 'A-X', children: [{ name: '2', path: 'A-X-Y', children: [] }] },
//     ],
//   }
//   ]
```

## Websocket

```javascript
import Event from '../event/index.mjs'

const HEARTBEAT_TIME = 20 * 1000

class MessageChannel extends Event {
  timer = null
  interval = null

  constructor() {
    super()
  }
}

new MessageChannel()
```
