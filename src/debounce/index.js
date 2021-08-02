const debounce = (fn, delay) => {
  let timer
  let result

  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        result = fn.apply(this, arguments)
      }, delay)
    } else {
      result = fn.apply(this, arguments)
    }

    return result
  }
}

const fn = debounce(() => {
  console.log('user click')
}, 500)

setInterval(fn, 100)
