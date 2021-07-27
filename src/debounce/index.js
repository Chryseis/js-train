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
