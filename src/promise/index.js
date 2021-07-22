const resolve = function (resolveVal) {
  this.status = 'fulfilled'
  this.result = resolveVal
  if (this.resolveCallbacks.length > 0) {
    if (this.status !== 'pending') {
      const callback = this.resolveCallbacks.splice(0, 1)[0]
      this.status = 'pending'
      resolveVal = callback(resolveVal)
      setTimeout(
        function () {
          this.status = 'fulfilled'
          this.result = resolveVal
          if (resolveVal instanceof MyPromise) {
            if (resolveVal.status === 'fulfilled') {
              resolveVal.then(
                function (data) {
                  resolve.call(this, data)
                }.bind(this)
              )
            } else {
              resolveVal.then(
                data => {},
                function (err) {
                  reject.call(this, err)
                }.bind(this)
              )
            }
          } else {
            resolve.call(this, resolveVal)
          }
        }.bind(this)
      )
    }
  }
}

const reject = function (rejectVal) {
  this.status = 'rejected'
  this.result = rejectVal
  if (this.rejectCallbacks.length > 0) {
    if (this.status !== 'pending') {
      const callback = this.rejectCallbacks.splice(0, 1)[0]
      this.status = 'pending'
      rejectVal = callback(rejectVal)
      setTimeout(
        function () {
          this.status = 'rejected'
          this.result = rejectVal
          if (rejectVal instanceof MyPromise) {
            if (rejectVal.status === 'rejected') {
              rejectVal.then(
                data => {},
                function (err) {
                  reject.call(this, err)
                }.bind(this)
              )
            } else {
              rejectVal.then(
                function (data) {
                  resolve.call(this, data)
                }.bind(this),
                err => {}
              )
            }
          } else {
            reject.call(this, rejectVal)
          }
        }.bind(this)
      )
    }
  }
}

class MyPromise {
  resolveCallbacks = []
  rejectCallbacks = []
  status = 'pending'
  result = undefined

  constructor(fn) {
    queueMicrotask(() => {
      fn(resolve.bind(this), reject.bind(this))
    })
  }

  then(resolveFn, rejectFn) {
    this.resolveCallbacks.push(resolveFn)
    this.rejectCallbacks.push(rejectFn)

    if (this.status !== 'pending') {
      setTimeout(
        function () {
          if (this.rejectCallbacks.length > 0) {
            reject.call(this, this.result)
          } else {
            resolve.call(this, this.result)
          }
        }.bind(this)
      )
    }

    return this
  }
}

MyPromise.resolve = function (val) {
  return new MyPromise(resolve => {
    resolve(val)
  })
}

MyPromise.reject = function (val) {
  return new MyPromise((resolve, reject) => {
    reject(val)
  })
}

new MyPromise((resolve, reject) => {
  resolve(1)
}).then(
  data => {
    console.log(data, 'step 1')
    return MyPromise.reject(2)
  },
  err => {
    console.log(err, 'step 2')
    return 2
  }
)
