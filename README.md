# js-train

## debounce
```javascript
const debounce = (fn, delay) => {
  let timer

  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(async function () {
        await fn.apply(this, arguments)
        timer = null
      }, delay)
    } else {
      fn.apply(this, arguments)
    }
  }
}

```

## deepClone
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

## getMax
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

const arr1 = [2, 0, 0, 4, 5]
console.log(getMax(arr1))
const arr2 = [2, 0, 0, 4, 5]
console.log(getMax1(arr2))

```

## event
```javascript
class Event {
  events
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

```

## inherit
```javascript

```

## jsBridge
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

## new
```javascript

```

## promise
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

console.log(MyPromise.resolve(1))

```

## promiseAll
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

## promiseRace
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

const promise1 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,1),1000)
})
const promise2 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,2),3000)
})
const promise3 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,3),2000)
})
const promise4 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,4),5000)
})
const promise5 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,5),6000)
})

Promise.race([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})

promiseRace([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})

```

## reduxMiddleware
```javascript

```

## bubbleSort
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

## quickSort
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

## throttle
```javascript
const throttle = (fn, delay) => {
  let startTime = +new Date()
  let first = true

  return function () {
    if (first) {
      fn.apply(this, arguments)
      startTime = +new Date()
      first = false
    } else {
      if (+new Date() - startTime > delay) {
        fn.apply(this, arguments)
        startTime = +new Date()
      }
    }
  }
}

const fn = throttle(() => {
  console.log('show', +new Date() - startTime)
}, 1000)

let startTime = +new Date()
setInterval(() => {
  fn()
}, 100)

```

## websocket
```javascript

```

