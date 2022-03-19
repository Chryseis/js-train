const debounce = (fn, delay, maxTime) => {
  let timer = null
  let lastTime = 0
  maxTime = maxTime ?? delay

  return function () {
    const context = this

    if (lastTime) {
      const currentTime = +new Date()
      if (currentTime - lastTime > maxTime) {
        lastTime = +new Date()
        fn.apply(context, arguments)
      } else {
        clearTimeout(timer)
        timer = setTimeout(function () {
          lastTime = +new Date()
          fn.apply(context, arguments)
        }, delay)
      }
    } else {
      fn.apply(context, arguments)
      timer = true
      lastTime = +new Date()
    }
  }
}

const fn = debounce(() => {
  console.log('user click')
}, 500)

setInterval(fn, 100)
