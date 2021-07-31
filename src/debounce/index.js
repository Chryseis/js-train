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

    return result
  }
}
