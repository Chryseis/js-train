const throttle = (fn, delay) => {
  let startTime = 0
  return function () {
    const context = this

    const currentTime = +new Date()
    if (startTime === 0) {
      startTime = +new Date()
      fn.apply(context, arguments)
    } else {
      if (currentTime - startTime > delay) {
        startTime = +new Date()
        fn.apply(context, arguments)
      }
    }
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
