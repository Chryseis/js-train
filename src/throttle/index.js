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
