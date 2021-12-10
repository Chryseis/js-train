const ctx = {}

const next = async () => {}

const middleware = [
  async function A(ctx, next) {
    console.log(1)
    await next()
    console.log(6)
  },
  async function B(ctx, next) {
    console.log(2)
    await next()
    console.log(5)
  },
  async function C(ctx, next) {
    console.log(3)
    await next()
    console.log(4)
  }
]

// 推到结果
// middleware.reduceRight((exec, fn, i) => {
//   if (i === 0) return fn(ctx, exec)
//   return () => fn(ctx, exec)
// }, next)

const compose = middleware => next => middleware.reduceRight((exec, fn) => ctx => fn(ctx, exec), next)

compose(middleware)(next)(ctx)
