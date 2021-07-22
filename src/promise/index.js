class MyPromise {
  callbacks = []
  status = 'pending'
  result = undefined

  constructor(fn) {
    const resolve = resolveVal => {
      this.status = 'fulfilled'
      this.result = resolveVal
      if (this.callbacks.length > 0) {
        if (this.status !== 'pending') {
          const { resolveFn } = this.callbacks.splice(0, 1)[0]
          this.status = 'pending'
          resolveVal = resolveFn(resolveVal)
          setTimeout(() => {
            this.status = 'fulfilled'
            this.result = resolveVal
            if (resolveVal instanceof MyPromise) {
              if (resolveVal.status === 'fulfilled') {
                resolveVal.then(function (data) {
                  resolve(data)
                })
              } else {
                resolveVal.then(
                  data => {},
                  err => {
                    reject(err)
                  }
                )
              }
            } else {
              resolve(resolveVal)
            }
          })
        }
      }
    }

    const reject = rejectVal => {
      this.status = 'rejected'
      this.result = rejectVal
      if (this.callbacks.length > 0) {
        if (this.status !== 'pending') {
          const { rejectFn } = this.callbacks.splice(0, 1)[0]
          this.status = 'pending'
          rejectVal = rejectFn(rejectVal)
          setTimeout(() => {
            this.status = 'rejected'
            this.result = rejectVal
            if (rejectVal instanceof MyPromise) {
              if (rejectVal.status === 'rejected') {
                rejectVal.then(
                  data => {},
                  err => {
                    reject(err)
                  }
                )
              } else {
                rejectVal.then(
                  data => {
                    resolve(data)
                  },
                  err => {}
                )
              }
            } else {
              reject(rejectVal)
            }
          })
        }
      }
    }

    queueMicrotask(() => {
      fn(resolve, reject)
    })

    this.then = (resolveFn, rejectFn) => {
      this.callbacks.push({ resolveFn, rejectFn })

      if (this.status !== 'pending') {
        setTimeout(() => {
          if (this.status === 'fulfilled') {
            resolve(this.result)
          } else {
            reject(this.result)
          }
        })
      }

      return this
    }

    this.catch = errFn => this.then(undefined, errFn)
    this.finally = finallyFn => {
      this.then(finallyFn, finallyFn)
    }
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
})
  .then(
    data => {
      console.log(data, 'resolve')
      return new MyPromise((resolve, reject) => {
        reject(2)
      })
    },
    err => {
      console.log(err, 'reject')
      return 3
    }
  )
  .then(
    data => {
      console.log(data, 'resolve')
    },
    err => {
      console.log(err, 'reject')
    }
  )
  .catch(() => {
    console.log('err')
  })
  .finally(() => {
    console.log('finally')
  })
