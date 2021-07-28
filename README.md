# js-train

## debounce
  ```javascript
    const debounce = (fn, delay) =&gt; {
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
const deepCloneByArray = val =&gt; {
  const visitedObjs = []

  const clone = val =&gt; {
    if (val instanceof RegExp) return new RegExp(val)
    if (val instanceof Date) return new Date(val)
    if (val === null || typeof val !== &#39;object&#39;) return val // 简单类型

    let retVal
    let visitedObj = visitedObjs.find(({ obj }) =&gt; obj === val)
    if (!visitedObj) {
      retVal = Array.isArray(val) ? [] : {}
      visitedObjs.push({ obj: val, retVal })
      Object.keys(val).forEach(key =&gt; {
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
const deepCloneByMap = val =&gt; {
  const visitedObjs = new Map()

  const clone = val =&gt; {
    if (val instanceof RegExp) return new RegExp(val)
    if (val instanceof Date) return new Date(val)
    if (val === null || typeof val !== &#39;object&#39;) return val // 简单类型

    let retVal
    if (!visitedObjs.has(val)) {
      retVal = Array.isArray(val) ? [] : {}
      visitedObjs.set(val, retVal)
      Object.keys(val).forEach(key =&gt; {
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
const deepCloneByWeakMap = (obj, hash = new WeakMap()) =&gt; {
  // 递归拷贝
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj === null || typeof obj !== &#39;object&#39;) return obj // 简单类型

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
console.log(+new Date() - start, &#39;Array&#39;)

let start1 = +new Date()
console.log(deepCloneByMap(obj))
console.log(+new Date() - start1, &#39;Map&#39;)

let start2 = +new Date()
console.log(deepCloneByWeakMap(obj))
console.log(+new Date() - start2, &#39;WeakMap&#39;)

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

  while (arr.length &gt; 0) {
    if (arr.length &lt; 2) {
      total += arr[0]
      arr.splice(0, 1)
    } else if (arr[0] &gt; arr[1]) {
      total += arr[0]
      arr.splice(0, 2)
    } else {
      if (arr[0] + arr[2] &lt; arr[1]) {
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
  for (let i = length - 1; i &gt;= 0; i--) {
    const nextIndex = i + 2
    if (nextIndex &gt; length - 1) continue
    if (nextIndex + 1 &lt;= length - 1) {
      arr[i] =
        arr[i] + arr[nextIndex + 1] &gt; arr[i] + arr[nextIndex] ? arr[i] + arr[nextIndex + 1] : arr[i] + arr[nextIndex]
    } else {
      arr[i] = arr[i] + arr[nextIndex]
    }
    if (arr[i] &gt; max) {
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
      let iframeElem = document.createElement(&#39;iframe&#39;)
      iframeElem.setAttribute(&#39;src&#39;, url)
      iframeElem.setAttribute(&#39;style&#39;, &#39;display:none;&#39;)
      iframeElem.setAttribute(&#39;height&#39;, &#39;0px&#39;)
      iframeElem.setAttribute(&#39;width&#39;, &#39;0px&#39;)
      iframeElem.setAttribute(&#39;frameborder&#39;, &#39;0&#39;)
      document.body.appendChild(iframeElem)
      setTimeout(() =&gt; {
        document.body.removeChild(iframeElem)
        iframeElem = null
      }, 300)
    } catch (e) {}
  }

  window.JSBridge = {
    dispatch(name, data) {
      const event = document.createEvent(&#39;Events&#39;)
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

  document.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; {
    window.JSBridge.dispatch(&#39;myJSBridgeReady&#39;)
  })
})()

  ```

  ## new
  ```javascript

  ```

  ## promise
  ```javascript
    class MyPromise {
  status = &#39;pending&#39;
  result = undefined

  constructor(fn) {
    let callbacks = []
    const resolve = resolveVal =&gt; {
      try {
        this.status = &#39;fulfilled&#39;
        this.result = resolveVal
        if (callbacks.length &gt; 0) {
          if (this.status !== &#39;pending&#39;) {
            const { resolveFn } = callbacks.splice(0, 1)[0]
            this.status = &#39;pending&#39;
            resolveVal = resolveFn(resolveVal)
            queueMicrotask(() =&gt; {
              this.status = &#39;fulfilled&#39;
              this.result = resolveVal
              if (resolveVal instanceof MyPromise) {
                if (resolveVal.status === &#39;fulfilled&#39;) {
                  resolveVal.then(function (data) {
                    resolve(data)
                  })
                } else {
                  resolveVal.then(
                    data =&gt; {},
                    err =&gt; {
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

    const reject = rejectVal =&gt; {
      this.status = &#39;rejected&#39;
      this.result = rejectVal
      if (callbacks.length &gt; 0) {
        if (this.status !== &#39;pending&#39;) {
          const { rejectFn } = callbacks.splice(0, 1)[0]
          this.status = &#39;pending&#39;
          rejectVal = rejectFn(rejectVal)
          queueMicrotask(() =&gt; {
            this.status = &#39;rejected&#39;
            this.result = rejectVal
            if (rejectVal instanceof MyPromise) {
              if (rejectVal.status === &#39;rejected&#39;) {
                rejectVal.then(
                  data =&gt; {},
                  err =&gt; {
                    reject(err)
                  }
                )
              } else {
                rejectVal.then(
                  data =&gt; {
                    resolve(data)
                  },
                  err =&gt; {}
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

    this.then = (resolveFn, rejectFn) =&gt; {
      callbacks.push({ resolveFn, rejectFn })

      if (this.status !== &#39;pending&#39;) {
        queueMicrotask(() =&gt; {
          if (this.status === &#39;fulfilled&#39;) {
            resolve(this.result)
          } else {
            reject(this.result)
          }
        })
      }

      return this
    }

    this.catch = errFn =&gt; this.then(undefined, errFn)

    this.finally = finallyFn =&gt; {
      this.then(finallyFn, finallyFn)
    }
  }
}

MyPromise.resolve = function (val) {
  return new MyPromise(resolve =&gt; {
    resolve(val)
  })
}

MyPromise.reject = function (val) {
  return new MyPromise((resolve, reject) =&gt; {
    reject(val)
  })
}

new MyPromise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(1)
  }, 500)
})
  .then(
    data =&gt; {
      console.log(data, &#39;resolve&#39;)
      return new MyPromise((resolve, reject) =&gt; {
        reject(2)
      })
    },
    err =&gt; {
      console.log(err, &#39;reject&#39;)
      return 3
    }
  )
  .then(
    data =&gt; {
      console.log(data, &#39;resolve&#39;)
    },
    err =&gt; {
      console.log(err, &#39;reject&#39;)
    }
  )
  .catch(() =&gt; {
    console.log(&#39;err&#39;)
  })
  .finally(() =&gt; {
    console.log(&#39;finally&#39;)
  })

console.log(MyPromise.resolve(1))

  ```

  ## promiseAll
  ```javascript
    function promiseAll(arr) {
  let retVal = []
  if (arr &amp;&amp; !arr.length) {
    console.warn(&#39;参数有问题&#39;)
  } else {
    return new Promise(resolve =&gt; {
      arr.forEach(promise =&gt; {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }

        promise.then(data =&gt; {
          retVal.push(data)
          if (retVal.length === arr.length) {
            resolve(retVal)
          }
        })
      })
    })
  }
}

const promise1 = () =&gt; Promise.resolve(1)
const promise2 = () =&gt; Promise.resolve(2)
const promise3 = () =&gt; Promise.resolve(3)
const promise4 = () =&gt; Promise.resolve(4)
const promise5 = () =&gt; Promise.resolve(5)

Promise.all([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data =&gt; {
  console.log(data)
})

promiseAll([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data =&gt; {
  console.log(data)
})

  ```

  ## promiseRace
  ```javascript
    function promiseRace(arr) {
  if (arr &amp;&amp; !arr.length) {
    console.warn(&#39;参数有问题&#39;)
  } else {
    return new Promise(resolve =&gt; {
      arr.forEach(promise =&gt; {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }

        promise.then(data =&gt; {
          resolve(data)
        })
      })
    })
  }
}

const promise1 = () =&gt; new Promise(resolve =&gt; {
  setTimeout(resolve.bind(this,1),1000)
})
const promise2 = () =&gt; new Promise(resolve =&gt; {
  setTimeout(resolve.bind(this,2),3000)
})
const promise3 = () =&gt; new Promise(resolve =&gt; {
  setTimeout(resolve.bind(this,3),2000)
})
const promise4 = () =&gt; new Promise(resolve =&gt; {
  setTimeout(resolve.bind(this,4),5000)
})
const promise5 = () =&gt; new Promise(resolve =&gt; {
  setTimeout(resolve.bind(this,5),6000)
})

Promise.race([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data =&gt; {
  console.log(data)
})

promiseRace([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data =&gt; {
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
  while (count &gt; 0) {
    for (let i = 0; i &lt; count; i++) {
      if (arr[i] &gt; arr[i + 1]) {
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
  for (let i = 0; i &lt; arr.length - 1; i++) {
    for (let j = 0; j &lt; arr.length - 1 - i; j++) {
      if (arr[j] &gt; arr[j + 1]) {
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

  if (halfIdx &lt; 1) {
    return arr
  } else {
    let temp1 = []
    let temp2 = []
    arr.splice(halfIdx, 1)
    for (let i = 0; i &lt; arr.length; i++) {
      if (arr[i] &lt; halfNo) {
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
    const throttle = (fn, delay) =&gt; {
  let startTime = +new Date()
  let first = true

  return function () {
    if (first) {
      fn.apply(this, arguments)
      startTime = +new Date()
      first = false
    } else {
      if (+new Date() - startTime &gt; delay) {
        fn.apply(this, arguments)
        startTime = +new Date()
      }
    }
  }
}

const fn = throttle(() =&gt; {
  console.log(&#39;show&#39;, +new Date() - startTime)
}, 1000)

let startTime = +new Date()
setInterval(() =&gt; {
  fn()
}, 100)

  ```

  ## websocket
  ```javascript

  ```

