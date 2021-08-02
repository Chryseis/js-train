const debounce = (fn, delay) => {
  let timer
  let result
  let first = true

  return function () {
    if (first) {
      first = false
      result = fn.apply(this, arguments)
    } else {
      clearTimeout(timer)
      timer = setTimeout(function () {
        result = fn.apply(this, arguments)
      }, delay)
    }

    return result
  }
}

const fn = debounce(() => {
  console.log('user click')
}, 500)

setInterval(fn, 100)
