const throttle = (fn, delay) => {
  let startTime = +new Date()
  let first = true

  return function () {
    if (first) {
      startTime = +new Date()
      first = false
      return fn.apply(this, arguments)
    } else {
      if (+new Date() - startTime > delay) {
        startTime = +new Date()
        return fn.apply(this, arguments)
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
