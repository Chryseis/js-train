const debounce = (fn, delay) => {
  let timer

  return function () {
    if (timer) {
      timer && clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(this, arguments)
      }, delay)
    } else {
      fn.apply(this, arguments)
    }
  }
}
