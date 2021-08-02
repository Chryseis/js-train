const debounce = (fn, delay) => {
  let timer
  let result
  let first = true

  return function () {
    const context = this
    const args = arguments
    if (first) {
      first = false
      result = fn.apply(context, args)
    } else {
      clearTimeout(timer)
      timer = setTimeout(function () {
        result = fn.apply(context, args)
      }, delay)
    }

    return result
  }
}

const fn = debounce(() => {
  console.log('user click')
}, 500)

setInterval(fn, 100)
